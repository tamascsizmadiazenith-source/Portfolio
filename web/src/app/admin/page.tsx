"use client";

import React, { useEffect, useState } from "react";

export default function AdminPage() {
  const [text, setText] = useState("");
  const [status, setStatus] = useState("");
  const [history, setHistory] = useState<string[]>([]);

  async function load(backup?: string) {
    setStatus("Loading...");
    try {
      const url = backup ? `/api/admin/variants?backup=${encodeURIComponent(backup)}` : "/api/admin/variants";
      const res = await fetch(url);
      if (!res.ok) throw new Error(String(res.status));
      const data = await res.json();
      setText(JSON.stringify(data, null, 2));
      setStatus("");
      await loadHistory();
    } catch (err) {
      setStatus("Failed to load variants");
    }
  }

  async function loadHistory() {
    try {
      const res = await fetch("/api/admin/variants/history");
      if (!res.ok) return;
      const items = await res.json();
      setHistory(items);
    } catch (err) {
      // ignore
    }
  }

  const [blocked, setBlocked] = useState<{ ip: string; blockedUntil: number }[]>([]);
  async function loadBlocked() {
    try {
      const res = await fetch("/api/admin/blocked");
      if (!res.ok) return;
      const items = await res.json();
      setBlocked(items);
    } catch (err) {
      // ignore
    }
  }

  useEffect(() => {
    load();
    loadBlocked();
  }, []);

  async function save() {
    try {
      const parsed = JSON.parse(text);
      setStatus("Saving...");
      const res = await fetch("/api/admin/variants", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ variants: parsed }),
      });
      if (!res.ok) throw new Error("save-failed");
      setStatus("Saved");
      await loadHistory();
    } catch (err) {
      setStatus("Invalid JSON or save failed");
    }
  }

  // quick local login form to create a session cookie (posts to /api/admin/auth)
  const [loginUser, setLoginUser] = useState("");
  const [loginPass, setLoginPass] = useState("");
  async function doLogin(e: React.FormEvent) {
    e.preventDefault();
    try {
      setStatus("Logging in...");
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: loginUser, pass: loginPass }),
      });
      if (!res.ok) throw new Error("login-failed");
      setStatus("Logged in");
    } catch (err) {
      setStatus("Login failed");
    }
  }

  function formatJSON() {
    try {
      const parsed = JSON.parse(text);
      setText(JSON.stringify(parsed, null, 2));
      setStatus("Formatted");
    } catch (err) {
      setStatus("Invalid JSON");
    }
  }

  function download() {
    try {
      const blob = new Blob([text], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "shopify-variants.json";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      setStatus("Download failed");
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-3">Shopify Variant Mappings</h1>
      <p className="mb-4 text-sm text-slate-600">
        Edit the JSON object mapping keys like &quot;Paper|50 x 40 cm&quot; to Shopify product variant GIDs.
      </p>
      <div className="flex gap-3 mb-3">
        <button onClick={save} className="bg-slate-900 text-white px-3 py-2 rounded">Save</button>
        <button onClick={() => load()} className="px-3 py-2 rounded border">Reload</button>
        <button onClick={formatJSON} className="px-3 py-2 rounded border">Format</button>
        <button onClick={download} className="px-3 py-2 rounded border">Download</button>
        <span className="text-sm text-slate-700">{status}</span>
      </div>

      <div className="flex gap-6">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-2/3 h-[520px] font-mono p-3 border rounded shadow-sm"
          aria-label="Variant mappings JSON"
        />

        <div className="w-1/3">
          <h2 className="font-semibold mb-2">Change History</h2>
          <div className="space-y-2 max-h-[480px] overflow-auto">
            {history.length === 0 && <div className="text-sm text-slate-500">No backups yet</div>}
            {history.map((h) => (
              <div key={h} className="flex items-center justify-between gap-2">
                <button
                  onClick={() => load(h)}
                  className="text-left text-sm text-slate-700 underline"
                >
                  {h}
                </button>
                <a
                  href={`/api/admin/variants?backup=${encodeURIComponent(h)}`}
                  className="text-sm text-slate-500"
                  target="_blank"
                  rel="noreferrer"
                >
                  View
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-6">
        <h2 className="font-semibold mb-2">Blocked IPs</h2>
        <div className="space-y-2">
          {blocked.length === 0 && <div className="text-sm text-slate-500">No blocked IPs</div>}
          {blocked.map((b) => (
            <div key={b.ip} className="flex items-center justify-between gap-2">
              <div className="text-sm text-slate-700">{b.ip}</div>
              <div className="text-sm text-slate-500">{Math.ceil((b.blockedUntil - Date.now()) / 1000)}s</div>
              <button
                onClick={async () => {
                  if (!confirm(`Unblock IP ${b.ip}?`)) return;
                  try {
                    await fetch("/api/admin/unblock", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ip: b.ip }) });
                    await loadBlocked();
                  } catch (err) {
                    // ignore
                  }
                }}
                className="px-2 py-1 text-sm rounded border"
              >
                Unblock
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h2 className="font-semibold mb-2">Admin Login (creates session cookie)</h2>
        <form onSubmit={doLogin} className="flex gap-2 items-center">
          <input value={loginUser} onChange={(e) => setLoginUser(e.target.value)} placeholder="username" className="px-2 py-1 border rounded" />
          <input value={loginPass} onChange={(e) => setLoginPass(e.target.value)} placeholder="password" type="password" className="px-2 py-1 border rounded" />
          <button className="px-3 py-1 bg-slate-800 text-white rounded">Login</button>
          <span className="text-sm text-slate-600 ml-2">{status}</span>
        </form>
      </div>
    </div>
  );
}
