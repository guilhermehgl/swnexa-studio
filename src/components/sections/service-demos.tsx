"use client";

import { useId, useMemo, useState, useSyncExternalStore } from "react";
import { ArrowUpRight, Search, X } from "lucide-react";
import Image from "next/image";
import personagem from "@/assets/personagem.png";

export function SiteDemo() {
  return (
    <article className="siteDemo" aria-label="Exemplo demonstrativo de site institucional">
      <div className="demoBrowser"><span><i /><i /><i /></span><span>site demonstrativo</span><ArrowUpRight size={10} /></div>
      <header className="siteDemoHeader"><strong>NOVA<span>°</span></strong><span>Sobre &nbsp; Trabalho &nbsp; Contato</span></header>
      <div className="siteDemoHero">
        <div className="siteDemoCopy">
          <span className="siteDemoEyebrow">IDEIAS COM PROPÓSITO</span>
          <h3>Construindo ideias que deixam marca.</h3>
          <p>Estratégia, identidade e experiências para aproximar pessoas e marcas.</p>
          <span className="siteDemoCta">Conhecer trabalho <ArrowUpRight size={12} /></span>
        </div>
        <div className="siteDemoPortrait" aria-hidden="true">
          <Image src={personagem} alt="" fill sizes="(max-width: 760px) 40vw, 20vw" style={{ objectFit: "contain", objectPosition: "center bottom" }} />
          <span className="portraitDetail">N° / 01</span>
        </div>
      </div>
      <footer className="siteDemoFooter"><span><strong>Boas ideias.</strong><br />Novas perspectivas.</span><span>IDENTIDADE & DIGITAL<br /><strong>Feito para conectar ↗</strong></span></footer>
    </article>
  );
}

type Client = { id: string; name: string };
const storageKey = "swnexa-studio-demo-clients";
const changeEvent = "swnexa-studio-demo-clients-change";
const initialClients: Client[] = [
  { id: "demo-1", name: "João Martins" },
  { id: "demo-2", name: "Mariana Souza" },
  { id: "demo-3", name: "Empresa Alfa" },
];
let temporarySnapshot: string | null = null;
let storageUnavailable = false;

function getSnapshot() {
  if (storageUnavailable) return temporarySnapshot;
  try { return window.localStorage.getItem(storageKey); }
  catch { return temporarySnapshot; }
}

function subscribe(callback: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === storageKey || event.key === null) callback();
  };
  window.addEventListener("storage", onStorage);
  window.addEventListener(changeEvent, callback);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(changeEvent, callback);
  };
}

function readClients(snapshot: string | null): Client[] {
  if (snapshot === null) return initialClients;
  try {
    const value: unknown = JSON.parse(snapshot);
    if (Array.isArray(value) && value.every((item) =>
      item && typeof item.id === "string" && typeof item.name === "string" &&
      item.name.trim().length > 0 && item.name.length <= 60,
    ) && new Set(value.map((item) => item.id)).size === value.length) return value;
  } catch { /* An invalid saved demo falls back to the original examples. */ }
  return initialClients;
}

function createClientId(clients: Client[]): string {
  // LAN previews over HTTP do not expose randomUUID (a secure-context API).
  let id: string;
  do {
    id = typeof window.crypto?.randomUUID === "function"
      ? window.crypto.randomUUID()
      : `client-${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
  } while (clients.some((client) => client.id === id));
  return id;
}

export function ClientsDemo() {
  const nameId = useId();
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, () => null);
  const clients = useMemo(() => readClients(snapshot), [snapshot]);
  const [name, setName] = useState("");
  const [query, setQuery] = useState("");
  const [notice, setNotice] = useState("");
  const filtered = clients.filter((client) => client.name.toLocaleLowerCase("pt-BR").includes(query.trim().toLocaleLowerCase("pt-BR")));

  function save(next: Client[], message: string) {
    temporarySnapshot = JSON.stringify(next);
    try {
      window.localStorage.setItem(storageKey, temporarySnapshot);
      storageUnavailable = false;
      setNotice(message);
    } catch {
      storageUnavailable = true;
      setNotice(`${message} Armazenamento indisponível; alterações duram apenas nesta visita.`);
    }
    window.dispatchEvent(new Event(changeEvent));
  }

  return (
    <section className="clientsDemo" aria-label="Demonstração interativa de cadastro de clientes">
      <header className="clientsDemoHeader"><h3>Clientes<span> / {clients.length.toString().padStart(2, "0")}</span></h3><span className="demoLive"><i /> DEMO INTERATIVA</span></header>
      <label className="demoSearch"><Search size={14} aria-hidden="true" /><input aria-label="Pesquisar clientes" placeholder="Pesquisar clientes…" value={query} onChange={(event) => setQuery(event.target.value)} type="search" maxLength={60} /></label>
      <form className="demoClientForm" onSubmit={(event) => {
        event.preventDefault();
        const trimmed = name.trim();
        if (!trimmed) return;
        save([...clients, { id: createClientId(clients), name: trimmed }], `${trimmed} adicionado.`);
        setName("");
      }}>
        <label htmlFor={nameId}>Novo cliente</label>
        <div><input id={nameId} placeholder="Nome do cliente" value={name} onChange={(event) => setName(event.target.value)} maxLength={60} autoComplete="off" required /><button type="submit" disabled={!name.trim()}>Adicionar <span aria-hidden="true">+</span></button></div>
      </form>
      <ul className="demoClientList" aria-label="Clientes cadastrados">
        {filtered.map((client) => <li key={client.id}><span className="demoClientAvatar" aria-hidden="true">{client.name.charAt(0).toLocaleUpperCase("pt-BR")}</span><span className="demoClientName" title={client.name}>{client.name}</span><button type="button" aria-label={`Excluir ${client.name}`} onClick={() => save(clients.filter((item) => item.id !== client.id), `${client.name} excluído.`)}><X size={14} /></button></li>)}
        {filtered.length === 0 && <li className="demoClientEmpty">{clients.length ? "Nenhum cliente encontrado." : "Adicione seu primeiro cliente."}</li>}
      </ul>
      <footer className="clientsDemoFooter"><span>Dados só neste navegador</span><button type="button" onClick={() => { save(initialClients, "Demonstração restaurada."); setQuery(""); setName(""); }}>Limpar demonstração</button></footer>
      <p className="demoNotice" role="status">{notice}</p>
    </section>
  );
}
