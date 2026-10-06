/**
 * Painel /admin: login (Firebase Auth) + lista de leads (Firestore).
 * Só é carregado na página /admin e só quando o Firebase está configurado.
 */
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore, collection, getDocs, orderBy, query, limit, doc, updateDoc, Timestamp } from 'firebase/firestore/lite';
import { integrations } from '../config/integrations';

type Lead = {
  id: string;
  name?: string;
  service?: string;
  quantity?: string;
  place?: string;
  location?: string;
  origin?: string;
  status?: string;
  message?: string;
  page?: string;
  createdAt?: Timestamp;
};

const root = document.querySelector<HTMLElement>('[data-admin]');
if (root) {
  const { leadsCollection, ...config } = integrations.firebase;
  const app = getApps()[0] ?? initializeApp(config);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const statuses = JSON.parse(root.dataset.statuses || '[]') as { id: string; label: string }[];

  const $ = <T extends HTMLElement>(sel: string) => root.querySelector<T>(sel)!;
  const views = root.querySelectorAll<HTMLElement>('[data-view]');
  const show = (name: string) => views.forEach((v) => (v.hidden = v.dataset.view !== name));

  let leads: Lead[] = [];

  const fmtDate = (t?: Timestamp) =>
    t ? t.toDate().toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' }) : '—';

  const el = (tag: string, cls?: string, text?: string) => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== undefined) e.textContent = text;
    return e;
  };

  const render = () => {
    const term = $<HTMLInputElement>('[data-search]').value.trim().toLowerCase();
    const st = $<HTMLSelectElement>('[data-status-filter]').value;
    const list = leads.filter((l) => {
      if (st && (l.status || 'novo') !== st) return false;
      if (!term) return true;
      return [l.name, l.service, l.location, l.place, l.origin].some((v) => v?.toLowerCase().includes(term));
    });
    const ul = $('[data-leads]');
    ul.replaceChildren(
      ...list.map((l) => {
        const li = el('li', 'lead');
        const top = el('div', 'lead__top');
        const left = el('div');
        left.append(el('div', 'lead__name', l.name || 'Sem nome'), el('div', 'lead__date', fmtDate(l.createdAt)));
        const sel = document.createElement('select');
        sel.className = 'lead__status';
        sel.setAttribute('aria-label', `Status do pedido de ${l.name || 'cliente'}`);
        statuses.forEach((s) => sel.append(new Option(s.label, s.id, false, (l.status || 'novo') === s.id)));
        sel.dataset.s = l.status || 'novo';
        sel.addEventListener('change', async () => {
          sel.disabled = true;
          try {
            await updateDoc(doc(db, leadsCollection, l.id), { status: sel.value });
            l.status = sel.value;
            sel.dataset.s = sel.value;
          } catch (err) {
            alert('Não foi possível atualizar o status. Verifique as permissões (firestore.rules).');
            sel.value = l.status || 'novo';
            console.error(err);
          } finally {
            sel.disabled = false;
          }
        });
        top.append(left, sel);

        const dl = el('dl', 'lead__grid');
        ([
          ['Serviço', l.service],
          ['Aparelhos', l.quantity],
          ['Local', l.place],
          ['Cidade/Bairro', l.location],
          ['Origem', l.origin || 'Direto / orgânico'],
          ['Página', l.page],
        ] as const).forEach(([k, v]) => {
          const d = el('div');
          d.append(el('dt', '', k), el('dd', '', v || '—'));
          dl.append(d);
        });

        const det = el('details');
        det.append(el('summary', '', 'Mensagem enviada'), el('pre', '', l.message || ''));
        li.append(top, dl, det);
        return li;
      }),
    );
    $('[data-empty]').hidden = list.length > 0;
    const novos = leads.filter((l) => (l.status || 'novo') === 'novo').length;
    $('[data-summary]').textContent = `${leads.length} pedidos carregados · ${novos} novos`;
  };

  const load = async () => {
    const err = $('[data-app-error]');
    err.hidden = true;
    try {
      const snap = await getDocs(query(collection(db, leadsCollection), orderBy('createdAt', 'desc'), limit(500)));
      leads = snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Lead, 'id'>) }));
      render();
    } catch (e) {
      console.error(e);
      err.textContent = 'Sem permissão para ler os pedidos. Confirme se o seu usuário está cadastrado na coleção "admins" (veja o README).';
      err.hidden = false;
      leads = [];
      render();
    }
  };

  const toCsv = () => {
    const cols: (keyof Lead)[] = ['name', 'service', 'quantity', 'place', 'location', 'origin', 'status', 'page'];
    const head = ['data', ...cols].join(';');
    const rows = leads.map((l) =>
      [fmtDate(l.createdAt), ...cols.map((c) => String(l[c] ?? ''))].map((v) => `"${v.replace(/"/g, '""')}"`).join(';'),
    );
    const blob = new Blob(['﻿' + [head, ...rows].join('\n')], { type: 'text/csv;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  $('[data-login]').addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const errBox = $('[data-login-error]');
    const btn = form.querySelector('button')!;
    errBox.hidden = true;
    btn.disabled = true;
    try {
      await signInWithEmailAndPassword(auth, (form.email as HTMLInputElement).value.trim(), (form.password as HTMLInputElement).value);
    } catch {
      errBox.textContent = 'E-mail ou senha inválidos.';
      errBox.hidden = false;
    } finally {
      btn.disabled = false;
    }
  });

  $('[data-logout]').addEventListener('click', () => signOut(auth));
  $('[data-refresh]').addEventListener('click', load);
  $('[data-export]').addEventListener('click', toCsv);
  $('[data-search]').addEventListener('input', render);
  $('[data-status-filter]').addEventListener('change', render);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      show('app');
      void load();
    } else {
      show('login');
    }
  });
}
