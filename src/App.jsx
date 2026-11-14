import React, { useState, useEffect, useMemo } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  Cat, Plus, Search, ShoppingCart, TrendingUp, TrendingDown, 
  Minus, CheckCircle2, AlertTriangle, Package, LogOut, Save, 
  Download, Copy, Filter, Trash2
} from 'lucide-react';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://fqfiwjjyzattphzalhzv.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_neLGQDeB5Tt03IncNC2m7g__pwDD-g0';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const BASE_INICIAL_OLV = [
  { fornecedor: "Fábrica (Itaipuaçu)", item: "Barbecue", unidade: "garrafa", qtd_por_embalagem: null, unidade_base: null, prev_terca: null, prev_sexta: 3, estoque_minimo: 2 },
  { fornecedor: "Fábrica (Itaipuaçu)", item: "Calabresa fatiada", unidade: "pct", qtd_por_embalagem: null, unidade_base: null, prev_terca: 10, prev_sexta: 8, estoque_minimo: 4 },
  { fornecedor: "Fábrica (Itaipuaçu)", item: "Calabresa ralada OLV", unidade: "pct", qtd_por_embalagem: null, unidade_base: null, prev_terca: 3, prev_sexta: 2, estoque_minimo: 2 },
  { fornecedor: "Fábrica (Itaipuaçu)", item: "Costela", unidade: "pct", qtd_por_embalagem: null, unidade_base: null, prev_terca: null, prev_sexta: 2, estoque_minimo: 1 },
  { fornecedor: "Fábrica (Itaipuaçu)", item: "Lombo canadense", unidade: "pct", qtd_por_embalagem: null, unidade_base: null, prev_terca: null, prev_sexta: 2, estoque_minimo: 1 },
  { fornecedor: "Fábrica (Itaipuaçu)", item: "Mesinha", unidade: "pct", qtd_por_embalagem: null, unidade_base: null, prev_terca: null, prev_sexta: 1, estoque_minimo: 1 },
  { fornecedor: "Fábrica (Itaipuaçu)", item: "Pepperoni", unidade: "kg", qtd_por_embalagem: null, unidade_base: null, prev_terca: 5, prev_sexta: 5, estoque_minimo: 2 },
  { fornecedor: "Rio Quality", item: "Carne seca (kg)", unidade: "kg", qtd_por_embalagem: null, unidade_base: null, prev_terca: 3, prev_sexta: null, estoque_minimo: 2 },
  { fornecedor: "Rio Quality", item: "Carne seca (pct)", unidade: "pct", qtd_por_embalagem: null, unidade_base: null, prev_terca: null, prev_sexta: 3, estoque_minimo: 2 },
  { fornecedor: "Rio Quality", item: "Chocolate ao leite", unidade: "cx", qtd_por_embalagem: 8, unidade_base: "un", prev_terca: 1, prev_sexta: 1, estoque_minimo: 1 },
  { fornecedor: "Rio Quality", item: "Chocolate branco", unidade: "cx", qtd_por_embalagem: 8, unidade_base: "un", prev_terca: 3, prev_sexta: 4, estoque_minimo: 2 },
  { fornecedor: "Rio Quality", item: "Molho Ciro", unidade: "kg", qtd_por_embalagem: null, unidade_base: null, prev_terca: 40, prev_sexta: null, estoque_minimo: 15 },
  { fornecedor: "Rio Quality", item: "Mussarela", unidade: "cx", qtd_por_embalagem: 25, unidade_base: "kg", prev_terca: 8, prev_sexta: 4, estoque_minimo: 3 },
  { fornecedor: "Rio Quality", item: "Queijo coalho", unidade: "kg", qtd_por_embalagem: null, unidade_base: null, prev_terca: 4, prev_sexta: null, estoque_minimo: 2 },
  { fornecedor: "Prads", item: "Massa 30 cm", unidade: "pct", qtd_por_embalagem: null, unidade_base: null, prev_terca: 10, prev_sexta: 20, estoque_minimo: 5 },
  { fornecedor: "Prads", item: "Massa 35 cm", unidade: "pct", qtd_por_embalagem: null, unidade_base: null, prev_terca: 15, prev_sexta: 15, estoque_minimo: 6 },
  { fornecedor: "Prads", item: "Massa 40 cm", unidade: "pct", qtd_por_embalagem: null, unidade_base: null, prev_terca: 10, prev_sexta: 15, estoque_minimo: 5 },
  { fornecedor: "Damata", item: "Palmito", unidade: "un", qtd_por_embalagem: null, unidade_base: null, prev_terca: 2, prev_sexta: null, estoque_minimo: 1 },
  { fornecedor: "Santa Maria", item: "Doce de leite", unidade: "un", qtd_por_embalagem: null, unidade_base: null, prev_terca: 12, prev_sexta: null, estoque_minimo: 4 },
  { fornecedor: "Santa Maria", item: "Parmesão", unidade: "kg", qtd_por_embalagem: null, unidade_base: null, prev_terca: 4, prev_sexta: 2, estoque_minimo: 2 },
  { fornecedor: "Catupiry", item: "Catupiry", unidade: "bisnaga", qtd_por_embalagem: null, unidade_base: null, prev_terca: 24, prev_sexta: null, estoque_minimo: 8 },
  { fornecedor: "Contecom", item: "Cloro", unidade: "un", qtd_por_embalagem: null, unidade_base: null, prev_terca: 2, prev_sexta: null, estoque_minimo: 1 },
  { fornecedor: "Contecom", item: "Desinfetante", unidade: "un", qtd_por_embalagem: null, unidade_base: null, prev_terca: 2, prev_sexta: null, estoque_minimo: 1 },
  { fornecedor: "Contecom", item: "Detergente", unidade: "un", qtd_por_embalagem: null, unidade_base: null, prev_terca: 4, prev_sexta: null, estoque_minimo: 2 },
  { fornecedor: "Contecom", item: "Pano de chão", unidade: "un", qtd_por_embalagem: null, unidade_base: null, prev_terca: 5, prev_sexta: null, estoque_minimo: 2 },
  { fornecedor: "Contecom", item: "Sabão em pó", unidade: "un", qtd_por_embalagem: null, unidade_base: null, prev_terca: 2, prev_sexta: null, estoque_minimo: 1 },
  { fornecedor: "Contecom", item: "Saco de lixo 60L", unidade: "un", qtd_por_embalagem: null, unidade_base: null, prev_terca: 1, prev_sexta: null, estoque_minimo: 1 },
  { fornecedor: "Contecom", item: "Álcool líquido", unidade: "un", qtd_por_embalagem: null, unidade_base: null, prev_terca: 12, prev_sexta: null, estoque_minimo: 4 },
  { fornecedor: "Exact", item: "Caixa Oliver's 20 cm", unidade: "fardo", qtd_por_embalagem: 50, unidade_base: "un", prev_terca: 2, prev_sexta: null, estoque_minimo: 1 },
  { fornecedor: "Exact", item: "Caixa Oliver's 40 cm", unidade: "fardo", qtd_por_embalagem: 50, unidade_base: "un", prev_terca: 6, prev_sexta: null, estoque_minimo: 2 },
  { fornecedor: "Exact", item: "Caixa Rajah unitária", unidade: "fardo", qtd_por_embalagem: 100, unidade_base: "un", prev_terca: 2, prev_sexta: null, estoque_minimo: 1 },
  { fornecedor: "Coca-Cola", item: "Coca-Cola KS", unidade: "un", qtd_por_embalagem: null, unidade_base: null, prev_terca: 2, prev_sexta: null, estoque_minimo: 1 },
  { fornecedor: "Coca-Cola", item: "Mate natural 300ml", unidade: "un", qtd_por_embalagem: null, unidade_base: null, prev_terca: 2, prev_sexta: null, estoque_minimo: 1 },
  { fornecedor: "Coca-Cola", item: "Schweppes citrus", unidade: "mala", qtd_por_embalagem: null, unidade_base: null, prev_terca: 3, prev_sexta: null, estoque_minimo: 1 },
  { fornecedor: "Coca-Cola", item: "Água sem gás", unidade: "mala", qtd_por_embalagem: null, unidade_base: null, prev_terca: 4, prev_sexta: null, estoque_minimo: 2 },
  { fornecedor: "Coca-Cola", item: "Água tônica", unidade: "mala", qtd_por_embalagem: null, unidade_base: null, prev_terca: 3, prev_sexta: null, estoque_minimo: 1 },
  { fornecedor: "Hortifruti", item: "Abacaxi", unidade: "un", qtd_por_embalagem: null, unidade_base: null, prev_terca: 3, prev_sexta: 3, estoque_minimo: 1 },
  { fornecedor: "Hortifruti", item: "Alho poró", unidade: "un", qtd_por_embalagem: null, unidade_base: null, prev_terca: 5, prev_sexta: 5, estoque_minimo: 2 },
  { fornecedor: "Hortifruti", item: "Banana", unidade: "cx", qtd_por_embalagem: 20, unidade_base: "kg", prev_terca: 2, prev_sexta: 2, estoque_minimo: 1 },
  { fornecedor: "Hortifruti", item: "Cebola roxa", unidade: "kg", qtd_por_embalagem: null, unidade_base: null, prev_terca: null, prev_sexta: 20, estoque_minimo: 5 },
  { fornecedor: "Hortifruti", item: "Laranja", unidade: "cx", qtd_por_embalagem: 20, unidade_base: "kg", prev_terca: 1, prev_sexta: 2, estoque_minimo: 1 },
  { fornecedor: "Hortifruti", item: "Limão", unidade: "kg", qtd_por_embalagem: null, unidade_base: null, prev_terca: 5, prev_sexta: 5, estoque_minimo: 2 },
  { fornecedor: "Hortifruti", item: "Manjericão", unidade: "un", qtd_por_embalagem: null, unidade_base: null, prev_terca: 3, prev_sexta: 4, estoque_minimo: 1 },
  { fornecedor: "Hortifruti", item: "Morango", unidade: "cx", qtd_por_embalagem: 4, unidade_base: "bdj", prev_terca: 5, prev_sexta: 6, estoque_minimo: 2 },
  { fornecedor: "Hortifruti", item: "Pimentão", unidade: "kg", qtd_por_embalagem: null, unidade_base: null, prev_terca: null, prev_sexta: 1, estoque_minimo: 1 },
  { fornecedor: "Hortifruti", item: "Rúcula", unidade: "un", qtd_por_embalagem: null, unidade_base: null, prev_terca: 2, prev_sexta: 3, estoque_minimo: 1 },
  { fornecedor: "Hortifruti", item: "Salsa", unidade: "un", qtd_por_embalagem: null, unidade_base: null, prev_terca: 2, prev_sexta: 2, estoque_minimo: 1 },
  { fornecedor: "Hortifruti", item: "Tomate", unidade: "cx", qtd_por_embalagem: 20, unidade_base: "kg", prev_terca: 1, prev_sexta: 1, estoque_minimo: 1 },
];

const GatinhoClique = () => {
  const [cliques, setCliques] = useState([]);

  useEffect(() => {
    const handlePointerDown = (e) => {
      const novoClique = { id: Date.now() + Math.random(), x: e.clientX, y: e.clientY };
      setCliques((prev) => [...prev.slice(-6), novoClique]);
    };
    window.addEventListener('pointerdown', handlePointerDown);
    return () => window.removeEventListener('pointerdown', handlePointerDown);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {cliques.map((c) => (
        <span
          key={c.id}
          className="absolute text-orange-500 animate-ping text-lg select-none drop-shadow-md"
          style={{ left: c.x - 12, top: c.y - 12 }}
        >
          🐾
        </span>
      ))}
    </div>
  );
};

const AnelOrganico = ({ quantidade }) => {
  const qtd = Math.min(Math.max(Number(quantidade) || 0, 0), 12);
  if (qtd === 0) return <span className="text-zinc-600 text-xs">—</span>;

  return (
    <div className="flex items-center gap-1 flex-wrap justify-center max-w-[120px]">
      {Array.from({ length: qtd }).map((_, i) => (
        <span 
          key={i} 
          className="inline-block w-3 h-3 rounded-full bg-orange-500 border border-orange-300 shadow-sm shadow-orange-500/50"
        />
      ))}
    </div>
  );
};

export default function App() {
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [loading, setLoading] = useState(false);

  const [abaAtiva, setAbaAtiva] = useState('contagem');
  const [diaPedido, setDiaPedido] = useState('Terça');
  const [tolerancia, setTolerancia] = useState(20);
  const [fornecedorFiltro, setFornecedorFiltro] = useState('TODOS');
  const [busca, setBusca] = useState('');

  const [itens, setItens] = useState([]);
  const [historico, setHistorico] = useState([]);
  const [contagemAtual, setContagemAtual] = useState({});

  const [modalManual, setModalManual] = useState(false);
  const [novoItem, setNovoItem] = useState({
    fornecedor: 'Fábrica (Itaipuaçu)',
    fornecedorCustom: '',
    item: '',
    unidade: 'un',
    estoque_minimo: 1,
    prev_terca: 0,
    prev_sexta: 0,
    preco_unitario: '',
    pedido_inicial: 1
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) carregarDados(session.user.id);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) carregarDados(session.user.id);
    });
    return () => subscription.unsubscribe();
  }, []);

  const carregarDados = async (userId) => {
    setLoading(true);
    const { data: itensData } = await supabase
      .from('itens_estoque')
      .select('*')
      .eq('user_id', userId)
      .order('fornecedor', { ascending: true })
      .order('item', { ascending: true });

    const { data: histData } = await supabase
      .from('registros_semanais')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    setItens(itensData || []);
    setHistorico(histData || []);

    const rascunho = {};
    (itensData || []).forEach(it => {
      rascunho[it.id] = {
        estoque: '',
        pedido: '',
        preco: it.preco_unitario ? String(it.preco_unitario) : ''
      };
    });
    setContagemAtual(rascunho);
    setLoading(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setAuthError('E-mail ou senha inválidos. Miau!');
  };

  const importarBasePadrao = async () => {
    if (!session) return;
    setLoading(true);
    const payload = BASE_INICIAL_OLV.map(it => ({
      ...it,
      user_id: session.user.id,
      preco_unitario: 0
    }));
    await supabase.from('itens_estoque').insert(payload);
    await carregarDados(session.user.id);
  };

  const salvarItemManual = async (e) => {
    e.preventDefault();
    if (!novoItem.item.trim()) return;
    const fornFinal = novoItem.fornecedor === 'OUTRO' 
      ? (novoItem.fornecedorCustom.trim() || 'Avulso') 
      : novoItem.fornecedor;
    const precoNum = parseFloat(String(novoItem.preco_unitario).replace(',', '.')) || 0;

    const { data, error } = await supabase.from('itens_estoque').insert([{
      user_id: session.user.id,
      fornecedor: fornFinal,
      item: novoItem.item.trim(),
      unidade: novoItem.unidade.trim() || 'un',
      estoque_minimo: Number(novoItem.estoque_minimo) || 0,
      prev_terca: Number(novoItem.prev_terca) || null,
      prev_sexta: Number(novoItem.prev_sexta) || null,
      preco_unitario: precoNum,
      is_manual: true
    }]).select().single();

    if (!error && data) {
      setItens(prev => [...prev, data]);
      setContagemAtual(prev => ({
        ...prev,
        [data.id]: {
          estoque: '0',
          pedido: String(novoItem.pedido_inicial || 1),
          preco: precoNum ? String(precoNum) : ''
        }
      }));
      setModalManual(false);
      setNovoItem({
        fornecedor: 'Fábrica (Itaipuaçu)', fornecedorCustom: '', item: '',
        unidade: 'un', estoque_minimo: 1, prev_terca: 0, prev_sexta: 0,
        preco_unitario: '', pedido_inicial: 1
      });
    }
  };

  const deletarItem = async (id) => {
    if (!confirm('Deseja realmente remover este item?')) return;
    await supabase.from('itens_estoque').delete().eq('id', id);
    setItens(prev => prev.filter(i => i.id !== id));
  };

  const atualizarCampo = (id, campo, valor) => {
    setContagemAtual(prev => ({
      ...prev,
      [id]: { ...(prev[id] || {}), [campo]: valor }
    }));
  };

  const atualizarMinimoOuPrev = async (id, campo, valor) => {
    const num = valor === '' ? null : Number(valor);
    setItens(prev => prev.map(it => it.id === id ? { ...it, [campo]: num } : it));
    await supabase.from('itens_estoque').update({ [campo]: num }).eq('id', id);
  };

  const salvarFechamentoSemanal = async () => {
    setLoading(true);
    const registros = [];

    for (const it of itens) {
      const dados = contagemAtual[it.id] || {};
      const est = dados.estoque !== '' ? Number(dados.estoque) : null;
      const ped = dados.pedido !== '' ? Number(dados.pedido) : null;
      const precoNum = parseFloat(String(dados.preco || '0').replace(',', '.')) || 0;

      if (precoNum !== Number(it.preco_unitario)) {
        await supabase.from('itens_estoque').update({ preco_unitario: precoNum }).eq('id', it.id);
      }

      if (est !== null || ped !== null) {
        registros.push({
          user_id: session.user.id,
          item_id: it.id,
          dia_pedido: diaPedido,
          estoque_atual: est ?? 0,
          pedido_planejado: ped ?? 0,
          preco_registrado: precoNum
        });
      }
    }

    if (registros.length > 0) {
      await supabase.from('registros_semanais').insert(registros);
      await carregarDados(session.user.id);
      alert(`Miau! ${registros.length} itens salvos no histórico de ${diaPedido}!`);
    } else {
      setLoading(false);
      alert('Preencha pelo menos um estoque ou pedido antes de salvar.');
    }
  };

  const fornecedores = useMemo(() => {
    const set = new Set(itens.map(i => i.fornecedor));
    return ['TODOS', ...Array.from(set).sort()];
  }, [itens]);

  const itensProcessados = useMemo(() => {
    return itens
      .filter(it => fornecedorFiltro === 'TODOS' || it.fornecedor === fornecedorFiltro)
      .filter(it => it.item.toLowerCase().includes(busca.toLowerCase()) || it.fornecedor.toLowerCase().includes(busca.toLowerCase()))
      .map(it => {
        const previsao = diaPedido === 'Terça' ? it.prev_terca : it.prev_sexta;
        const rasc = contagemAtual[it.id] || {};
        const estoque = rasc.estoque !== '' && rasc.estoque !== undefined ? Number(rasc.estoque) : null;
        const pedido = rasc.pedido !== '' && rasc.pedido !== undefined ? Number(rasc.pedido) : null;
        const preco = parseFloat(String(rasc.preco || it.preco_unitario || '0').replace(',', '.')) || 0;

        const alvo = Math.max(previsao || 0, it.estoque_minimo || 0);
        const sugestao = estoque !== null ? Math.max(0, alvo - estoque) : (previsao || 0);

        const qtdEfetivaPedido = pedido !== null ? pedido : sugestao;
        const subtotal = qtdEfetivaPedido * preco;
        const equivalente = it.qtd_por_embalagem && qtdEfetivaPedido > 0
          ? `${qtdEfetivaPedido * it.qtd_por_embalagem} ${it.unidade_base}`
          : null;

        const histItem = historico.filter(h => h.item_id === it.id);
        const ultimo = histItem[0];
        const penultimo = histItem[1];
        let tendencia = null;
        if (ultimo && penultimo && penultimo.pedido_planejado > 0) {
          const diff = ultimo.pedido_planejado - penultimo.pedido_planejado;
          const pct = (diff / penultimo.pedido_planejado) * 100;
          tendencia = { diff, pct, atual: ultimo.pedido_planejado, anterior: penultimo.pedido_planejado };
        }

        return {
          ...it, previsao, estoque, pedido, preco, sugestao,
          qtdEfetivaPedido, subtotal, equivalente, tendencia
        };
      });
  }, [itens, diaPedido, fornecedorFiltro, busca, contagemAtual, historico]);

  const pedidosPorFornecedor = useMemo(() => {
    const grupos = {};
    itensProcessados.forEach(it => {
      if (it.qtdEfetivaPedido > 0) {
        if (!grupos[it.fornecedor]) grupos[it.fornecedor] = { itens: [], total: 0 };
        grupos[it.fornecedor].itens.push(it);
        grupos[it.fornecedor].total += it.subtotal;
      }
    });
    return grupos;
  }, [itensProcessados]);

  const copiarPedidoWhatsApp = (fornecedor, grupo) => {
    const linhas = grupo.itens.map(it => {
      const eq = it.equivalente ? ` (${it.equivalente})` : '';
      const pr = it.preco > 0 ? ` — R$ ${it.subtotal.toFixed(2)}` : '';
      return `• ${it.item}: *${it.qtdEfetivaPedido} ${it.unidade}*${eq}${pr}`;
    });
    const texto = `🐱 *Pedido ${fornecedor} (${diaPedido})*\n\n${linhas.join('\n')}${grupo.total > 0 ? `\n\n*Total Estimado: R$ ${grupo.total.toFixed(2)}*` : ''}`;
    navigator.clipboard.writeText(texto);
    alert(`Pedido de ${fornecedor} copiado para o WhatsApp!`);
  };

  if (!session) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center p-4">
        <GatinhoClique />
        <div className="w-full max-w-md bg-zinc-900 border border-orange-500/30 rounded-2xl p-6 shadow-2xl">
          <div className="flex flex-col items-center mb-6">
            <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center text-zinc-950 mb-3 shadow-lg shadow-orange-500/20">
              <Cat size={36} strokeWidth={2.5} />
            </div>
            <h1 className="text-2xl font-bold text-white">CatStock <span className="text-orange-500">OLV</span></h1>
            <p className="text-zinc-400 text-sm text-center mt-1">Controle de Estoque Multi-Unidade</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs uppercase font-semibold text-zinc-400">E-mail da Unidade / Operador</label>
              <input
                type="email" required value={email} onChange={e => setEmail(e.target.value)}
                placeholder="ex: saogoncalo@olivers.com"
                className="w-full mt-1 bg-zinc-950 border border-zinc-800 focus:border-orange-500 rounded-xl px-4 py-3 text-white outline-none"
              />
            </div>
            <div>
              <label className="text-xs uppercase font-semibold text-zinc-400">Senha</label>
              <input
                type="password" required value={password} onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full mt-1 bg-zinc-950 border border-zinc-800 focus:border-orange-500 rounded-xl px-4 py-3 text-white outline-none"
              />
            </div>
            {authError && <p className="text-orange-400 text-sm bg-orange-500/10 p-2 rounded-lg">{authError}</p>}
            <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-zinc-950 font-bold py-3 rounded-xl transition">
              Entrar na Unidade 🐾
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 pb-20">
      <GatinhoClique />
      <header className="bg-zinc-900 border-b border-orange-500/30 sticky top-0 z-30 px-4 py-3">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-zinc-950">
              <Cat size={24} strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight">CatStock <span className="text-orange-500">OLV</span></h1>
              <p className="text-xs text-zinc-400">{session.user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-zinc-950 p-1 rounded-xl border border-zinc-800">
            {['Terça', 'Sexta'].map(dia => (
              <button
                key={dia}
                onClick={() => setDiaPedido(dia)}
                className={`px-4 py-1.5 rounded-lg text-sm font-bold transition ${
                  diaPedido === dia ? 'bg-orange-500 text-zinc-950' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Pedido {dia}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setModalManual(true)}
              className="flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-zinc-950 font-bold px-3 py-2 rounded-xl text-sm transition"
            >
              <Plus size={16} /> + Novo Item Manual & Preço
            </button>
            <button
              onClick={() => supabase.auth.signOut()}
              className="p-2 text-zinc-400 hover:text-orange-500 bg-zinc-950 rounded-xl border border-zinc-800"
              title="Sair"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto flex gap-2 mt-3 overflow-x-auto">
          {[
            { id: 'contagem', label: '1. Contagem & Estoque Mínimo', icon: Package },
            { id: 'pedido', label: '2. Pedido por Fornecedor', icon: ShoppingCart },
            { id: 'analise', label: '3. Análise de Variação', icon: TrendingUp },
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setAbaAtiva(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition ${
                  abaAtiva === tab.id
                    ? 'bg-orange-500/20 text-orange-400 border border-orange-500/50'
                    : 'bg-zinc-950 text-zinc-400 border border-zinc-800 hover:text-white'
                }`}
              >
                <Icon size={16} /> {tab.label}
              </button>
            );
          })}
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4">
        {itens.length === 0 && !loading && (
          <div className="bg-zinc-900 border border-orange-500/40 rounded-2xl p-8 text-center my-8">
            <Cat size={48} className="mx-auto text-orange-500 mb-3" />
            <h2 className="text-xl font-bold mb-2">Sua base de itens está vazia nesta unidade!</h2>
            <p className="text-zinc-400 text-sm max-w-md mx-auto mb-6">
              Clique abaixo para carregar todos os itens (bebidas, hortifruti, embalagens, carnes, limpeza) e previsões padrão.
            </p>
            <button
              onClick={importarBasePadrao}
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-zinc-950 font-bold px-6 py-3 rounded-xl"
            >
              <Download size={18} /> Importar Catálogo Padrão OLV (48 itens)
            </button>
          </div>
        )}

        {itens.length > 0 && (
          <div className="flex flex-wrap items-center gap-3 mb-4 bg-zinc-900 p-3 rounded-2xl border border-zinc-800">
            <div className="flex items-center gap-2 flex-1 min-w-[200px] bg-zinc-950 px-3 py-2 rounded-xl border border-zinc-800">
              <Search size={16} className="text-zinc-500" />
              <input
                type="text"
                placeholder="Buscar item, bebida ou fornecedor..."
                value={busca}
                onChange={e => setBusca(e.target.value)}
                className="bg-transparent text-sm text-white outline-none w-full"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter size={16} className="text-orange-500" />
              <select
                value={fornecedorFiltro}
                onChange={e => setFornecedorFiltro(e.target.value)}
                className="bg-zinc-950 border border-zinc-800 text-sm text-white rounded-xl px-3 py-2 outline-none"
              >
                {fornecedores.map(f => (
                  <option key={f} value={f}>{f === 'TODOS' ? 'Todos Fornecedores' : f}</option>
                ))}
              </select>
            </div>

            <button
              onClick={salvarFechamentoSemanal}
              className="ml-auto flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-bold px-4 py-2 rounded-xl text-sm transition"
            >
              <Save size={16} /> Salvar Semana
            </button>
          </div>
        )}

        {abaAtiva === 'contagem' && itens.length > 0 && (
          <div className="overflow-x-auto bg-zinc-900 rounded-2xl border border-zinc-800">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-zinc-800 text-zinc-400 text-xs uppercase bg-zinc-950/60">
                  <th className="p-3">Fornecedor / Item</th>
                  <th className="p-3 text-center">Prev. {diaPedido}</th>
                  <th className="p-3 text-center">Est. Mínimo</th>
                  <th className="p-3 text-center bg-orange-500/10 text-orange-400">Estoque Atual</th>
                  <th className="p-3 text-center">Sugestão (Anel)</th>
                  <th className="p-3 text-center bg-orange-500/10 text-orange-400">Pedido Final (Anel)</th>
                  <th className="p-3 text-center">Preço Un. (R$)</th>
                  <th className="p-3 text-center">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/70">
                {itensProcessados.map(it => {
                  const abaixoMinimo = it.estoque !== null && it.estoque < it.estoque_minimo;
                  return (
                    <tr key={it.id} className="hover:bg-zinc-800/40 transition">
                      <td className="p-3">
                        <span className="text-[11px] font-semibold text-orange-400 block">{it.fornecedor}</span>
                        <span className="font-medium text-white">{it.item}</span>
                        <span className="text-xs text-zinc-500 ml-1.5">({it.unidade})</span>
                        {it.equivalente && (
                          <span className="block text-[11px] text-zinc-400">Equiv: {it.equivalente}</span>
                        )}
                      </td>

                      <td className="p-3 text-center">
                        <input
                          type="number"
                          value={it.previsao ?? ''}
                          placeholder="—"
                          onChange={e => atualizarMinimoOuPrev(
                            it.id,
                            diaPedido === 'Terça' ? 'prev_terca' : 'prev_sexta',
                            e.target.value
                          )}
                          className="w-14 bg-zinc-950 border border-zinc-800 rounded-lg py-1 text-center text-zinc-300"
                        />
                      </td>

                      <td className="p-3 text-center">
                        <input
                          type="number"
                          value={it.estoque_minimo ?? 0}
                          onChange={e => atualizarMinimoOuPrev(it.id, 'estoque_minimo', e.target.value)}
                          className="w-14 bg-zinc-950 border border-zinc-800 rounded-lg py-1 text-center text-zinc-300"
                        />
                      </td>

                      <td className="p-3 text-center bg-orange-500/5">
                        <input
                          type="number"
                          placeholder="0"
                          value={contagemAtual[it.id]?.estoque ?? ''}
                          onChange={e => atualizarCampo(it.id, 'estoque', e.target.value)}
                          className={`w-16 bg-zinc-950 border rounded-lg py-1.5 text-center font-bold outline-none ${
                            abaixoMinimo ? 'border-red-500 text-red-400' : 'border-orange-500/40 text-white'
                          }`}
                        />
                      </td>

                      <td className="p-3 text-center">
                        <div className="flex flex-col items-center">
                          <span className="text-xs font-bold text-orange-400 mb-1">{it.sugestao} {it.unidade}</span>
                          <AnelOrganico quantidade={it.sugestao} />
                        </div>
                      </td>

                      <td className="p-3 text-center bg-orange-500/5">
                        <div className="flex flex-col items-center">
                          <input
                            type="number"
                            placeholder={String(it.sugestao)}
                            value={contagemAtual[it.id]?.pedido ?? ''}
                            onChange={e => atualizarCampo(it.id, 'pedido', e.target.value)}
                            className="w-16 bg-zinc-950 border border-orange-500/40 rounded-lg py-1 text-center font-bold text-emerald-400 outline-none mb-1"
                          />
                          <AnelOrganico quantidade={contagemAtual[it.id]?.pedido !== '' && contagemAtual[it.id]?.pedido !== undefined ? contagemAtual[it.id]?.pedido : it.sugestao} />
                        </div>
                      </td>

                      <td className="p-3 text-center">
                        <input
                          type="text"
                          placeholder="0,00"
                          value={contagemAtual[it.id]?.preco ?? ''}
                          onChange={e => atualizarCampo(it.id, 'preco', e.target.value)}
                          className="w-20 bg-zinc-950 border border-zinc-800 rounded-lg py-1 text-center text-zinc-200"
                        />
                      </td>

                      <td className="p-3 text-center">
                        {it.is_manual ? (
                          <button 
                            onClick={() => deletarItem(it.id)}
                            className="p-1.5 text-red-400 hover:bg-red-500/20 rounded-lg"
                            title="Remover item manual"
                          >
                            <Trash2 size={16} />
                          </button>
                        ) : (
                          <span className="text-xs text-zinc-600">Padrão</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {abaAtiva === 'pedido' && (
          <div className="grid md:grid-cols-2 gap-4">
            {Object.entries(pedidosPorFornecedor).map(([fornecedor, grupo]) => (
              <div key={fornecedor} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-3">
                    <div>
                      <h3 className="font-bold text-lg text-orange-400">{fornecedor}</h3>
                      <p className="text-xs text-zinc-400">{grupo.itens.length} itens na lista de {diaPedido}</p>
                    </div>
                    <button
                      onClick={() => copiarPedidoWhatsApp(fornecedor, grupo)}
                      className="flex items-center gap-1.5 bg-zinc-800 hover:bg-orange-500 hover:text-zinc-950 text-zinc-200 text-xs font-bold px-3 py-2 rounded-xl transition"
                    >
                      <Copy size={14} /> Copiar WhatsApp
                    </button>
                  </div>

                  <ul className="space-y-2 text-sm">
                    {grupo.itens.map(it => (
                      <li key={it.id} className="flex items-center justify-between bg-zinc-950/60 px-3 py-2 rounded-xl">
                        <div>
                          <span className="font-medium text-white">{it.item}</span>
                          {it.equivalente && <span className="text-xs text-zinc-400 ml-2">({it.equivalente})</span>}
                        </div>
                        <div className="text-right">
                          <span className="font-bold text-orange-400">{it.qtdEfetivaPedido} {it.unidade}</span>
                          {it.subtotal > 0 && (
                            <span className="block text-xs text-emerald-400">R$ {it.subtotal.toFixed(2)}</span>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {grupo.total > 0 && (
                  <div className="mt-4 pt-3 border-t border-zinc-800 flex justify-between items-center">
                    <span className="text-xs uppercase text-zinc-400 font-semibold">Total Fornecedor</span>
                    <span className="text-lg font-bold text-emerald-400">R$ {grupo.total.toFixed(2)}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {abaAtiva === 'analise' && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
            <h2 className="font-bold text-lg mb-1">Análise de Aumento ou Queda Semanal</h2>
            <p className="text-xs text-zinc-400 mb-4">Comparação de consumo entre os registros salvos desta unidade.</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {itensProcessados.map(it => (
                <div key={it.id} className="bg-zinc-950 border border-zinc-800 rounded-xl p-3 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-orange-400 block">{it.fornecedor}</span>
                    <span className="font-semibold text-sm text-white">{it.item}</span>
                  </div>
                  {it.tendencia ? (
                    <div className={`text-right px-2.5 py-1.5 rounded-lg ${
                      it.tendencia.diff > 0 ? 'bg-red-500/10 text-red-400' :
                      it.tendencia.diff < 0 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-zinc-800 text-zinc-400'
                    }`}>
                      <div className="flex items-center justify-end gap-1 font-bold text-sm">
                        {it.tendencia.diff > 0 ? <TrendingUp size={15} /> : it.tendencia.diff < 0 ? <TrendingDown size={15} /> : <Minus size={15} />}
                        {it.tendencia.diff > 0 ? `+${it.tendencia.pct.toFixed(0)}%` : `${it.tendencia.pct.toFixed(0)}%`}
                      </div>
                    </div>
                  ) : (
                    <span className="text-xs text-zinc-600">Histórico curto</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {modalManual && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <form onSubmit={salvarItemManual} className="bg-zinc-900 border border-orange-500/40 rounded-2xl p-5 w-full max-w-md space-y-3">
            <h3 className="font-bold text-lg text-white flex items-center gap-2">
              <Cat className="text-orange-500" size={20} /> Adicionar Item Avulso & Preço
            </h3>

            <div>
              <label className="text-xs text-zinc-400">Fornecedor</label>
              <select
                value={novoItem.fornecedor}
                onChange={e => setNovoItem({ ...novoItem, fornecedor: e.target.value })}
                className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-white"
              >
                {fornecedores.filter(f => f !== 'TODOS').map(f => (
                  <option key={f} value={f}>{f}</option>
                ))}
                <option value="OUTRO">+ Digitar Novo Fornecedor...</option>
              </select>
            </div>

            {novoItem.fornecedor === 'OUTRO' && (
              <input
                type="text"
                placeholder="Nome do novo fornecedor"
                value={novoItem.fornecedorCustom}
                onChange={e => setNovoItem({ ...novoItem, fornecedorCustom: e.target.value })}
                className="w-full bg-zinc-950 border border-orange-500/50 rounded-xl px-3 py-2 text-sm text-white"
              />
            )}

            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2">
                <label className="text-xs text-zinc-400">Nome do Item</label>
                <input
                  type="text" required placeholder="Ex: Cerveja IPA 600ml"
                  value={novoItem.item}
                  onChange={e => setNovoItem({ ...novoItem, item: e.target.value })}
                  className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-white"
                />
              </div>
              <div>
                <label className="text-xs text-zinc-400">Unidade</label>
                <input
                  type="text" placeholder="un, cx, kg"
                  value={novoItem.unidade}
                  onChange={e => setNovoItem({ ...novoItem, unidade: e.target.value })}
                  className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="text-xs text-zinc-400">Est. Mínimo</label>
                <input
                  type="number"
                  value={novoItem.estoque_minimo}
                  onChange={e => setNovoItem({ ...novoItem, estoque_minimo: e.target.value })}
                  className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-white"
                />
              </div>
              <div>
                <label className="text-xs text-zinc-400">Qtd Pedido</label>
                <input
                  type="number"
                  value={novoItem.pedido_inicial}
                  onChange={e => setNovoItem({ ...novoItem, pedido_inicial: e.target.value })}
                  className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-white"
                />
              </div>
              <div>
                <label className="text-xs text-orange-400 font-semibold">Preço (R$)</label>
                <input
                  type="text" placeholder="Ex: 12,50"
                  value={novoItem.preco_unitario}
                  onChange={e => setNovoItem({ ...novoItem, preco_unitario: e.target.value })}
                  className="w-full mt-1 bg-zinc-950 border border-orange-500/50 rounded-xl px-3 py-2 text-sm text-white"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button" onClick={() => setModalManual(false)}
                className="flex-1 bg-zinc-800 text-zinc-300 py-2.5 rounded-xl text-sm font-semibold"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 bg-orange-500 text-zinc-950 py-2.5 rounded-xl text-sm font-bold"
              >
                Adicionar Item
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}