import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Dices, Shield, Zap, Sparkles, Trophy, Sliders,
  ChevronRight, Medal, Swords,
} from "lucide-react";
import { Link } from "react-router-dom";

// ─── FORMATIONS ──────────────────────────────────────────────────────────────
const FORMATIONS_DATA = {
  "4-2-3-1": {
    name: "4-2-3-1 Cortina",
    Equilibrado: { POR:{r:6,c:3},LI:{r:5,c:1},DFC1:{r:5,c:2},DFC2:{r:5,c:4},LD:{r:5,c:5},MCD:{r:4,c:2},MC:{r:4,c:4},EI:{r:2,c:1},MP:{r:2,c:3},ED:{r:2,c:5},DC:{r:1,c:3} },
    Ofensivo:   { POR:{r:6,c:3},LI:{r:5,c:1},DFC1:{r:5,c:2},DFC2:{r:5,c:4},LD:{r:5,c:5},MC1:{r:4,c:2},MC2:{r:4,c:4},EI:{r:2,c:1},MP:{r:2,c:3},ED:{r:2,c:5},DC:{r:1,c:3} },
    Defensivo:  { POR:{r:6,c:3},LI:{r:5,c:1},DFC1:{r:5,c:2},DFC2:{r:5,c:4},LD:{r:5,c:5},MCD1:{r:4,c:2},MCD2:{r:4,c:4},EI:{r:2,c:1},MP:{r:2,c:3},ED:{r:2,c:5},DC:{r:1,c:3} },
  },
  "4-3-3": {
    name: "4-3-3 Tradicional",
    Equilibrado: { POR:{r:6,c:3},LI:{r:5,c:1},DFC1:{r:5,c:2},DFC2:{r:5,c:4},LD:{r:5,c:5},MC1:{r:4,c:1.5},MCD:{r:4,c:3},MC2:{r:4,c:4.5},EI:{r:1,c:1},DC:{r:1,c:3},ED:{r:1,c:5} },
    Ofensivo:   { POR:{r:6,c:3},LI:{r:5,c:1},DFC1:{r:5,c:2},DFC2:{r:5,c:4},LD:{r:5,c:5},MC1:{r:4,c:1.5},MP:{r:2,c:3},MC2:{r:4,c:4.5},EI:{r:1,c:1},DC:{r:1,c:3},ED:{r:1,c:5} },
    Defensivo:  { POR:{r:6,c:3},LI:{r:5,c:1},DFC1:{r:5,c:2},DFC2:{r:5,c:4},LD:{r:5,c:5},MCD1:{r:4,c:1.5},MC:{r:4,c:3},MCD2:{r:4,c:4.5},EI:{r:1,c:1},DC:{r:1,c:3},ED:{r:1,c:5} },
  },
  "4-4-2": {
    name: "4-4-2 Clásico",
    Equilibrado: { POR:{r:6,c:3},LI:{r:5,c:1},DFC1:{r:5,c:2},DFC2:{r:5,c:4},LD:{r:5,c:5},MI:{r:4,c:1},MC:{r:4,c:2.3},MCD:{r:4,c:3.7},MD:{r:4,c:5},DC1:{r:1,c:2},DC2:{r:1,c:4} },
    Ofensivo:   { POR:{r:6,c:3},LI:{r:5,c:1},DFC1:{r:5,c:2},DFC2:{r:5,c:4},LD:{r:5,c:5},MCD:{r:4.2,c:3},MC1:{r:3.2,c:1.5},MC2:{r:3.2,c:4.5},MP:{r:2.2,c:3},DC1:{r:1,c:2},DC2:{r:1,c:4} },
    Defensivo:  { POR:{r:6,c:3},LI:{r:5,c:1},DFC1:{r:5,c:2},DFC2:{r:5,c:4},LD:{r:5,c:5},MI:{r:4,c:1},MCD1:{r:4,c:2.3},MCD2:{r:4,c:3.7},MD:{r:4,c:5},DC1:{r:1,c:2},DC2:{r:1,c:4} },
  },
  "3-5-2": {
    name: "3-5-2 Continental",
    Equilibrado: { POR:{r:6,c:3},DFC1:{r:5,c:1.5},DFC2:{r:5,c:3},DFC3:{r:5,c:4.5},MI:{r:3.5,c:1},MC1:{r:4,c:2.2},MCD:{r:4,c:3},MC2:{r:4,c:3.8},MD:{r:3.5,c:5},DC1:{r:1,c:2},DC2:{r:1,c:4} },
    Ofensivo:   { POR:{r:6,c:3},DFC1:{r:5,c:1.5},DFC2:{r:5,c:3},DFC3:{r:5,c:4.5},EI:{r:2,c:1},MC1:{r:4,c:2},MP:{r:3,c:3},MC2:{r:4,c:4},ED:{r:2,c:5},DC1:{r:1,c:2},DC2:{r:1,c:4} },
    Defensivo:  { POR:{r:6,c:3},DFC1:{r:5,c:1.5},DFC2:{r:5,c:3},DFC3:{r:5,c:4.5},MI:{r:3.5,c:1},MCD1:{r:4,c:2},MC:{r:4,c:3},MCD2:{r:4,c:4},MD:{r:3.5,c:5},DC1:{r:1,c:2},DC2:{r:1,c:4} },
  },
  "5-3-2": {
    name: "5-3-2 Muralla",
    Equilibrado: { POR:{r:6,c:3},LI:{r:5,c:1},DFC1:{r:5,c:2},DFC2:{r:5,c:3},DFC3:{r:5,c:4},LD:{r:5,c:5},MC1:{r:4,c:1.5},MCD:{r:4,c:3},MC2:{r:4,c:4.5},DC1:{r:1,c:2},DC2:{r:1,c:4} },
    Ofensivo:   { POR:{r:6,c:3},LI:{r:5,c:1},DFC1:{r:5,c:2},DFC2:{r:5,c:3},DFC3:{r:5,c:4},LD:{r:5,c:5},MC1:{r:4,c:2},MP:{r:3,c:3},MC2:{r:4,c:4},DC1:{r:1,c:2},DC2:{r:1,c:4} },
    Defensivo:  { POR:{r:6,c:3},LI:{r:5,c:1},DFC1:{r:5,c:2},DFC2:{r:5,c:3},DFC3:{r:5,c:4},LD:{r:5,c:5},MCD1:{r:4,c:2},MC:{r:4,c:3},MCD2:{r:4,c:4},DC1:{r:1,c:2},DC2:{r:1,c:4} },
  },
  "4-5-1": {
    name: "4-5-1 Flexible",
    Equilibrado: { POR:{r:6,c:3},LI:{r:5,c:1},DFC1:{r:5,c:2},DFC2:{r:5,c:4},LD:{r:5,c:5},MI:{r:3.5,c:1},MC1:{r:4,c:2},MCD:{r:4,c:3},MC2:{r:4,c:4},MD:{r:3.5,c:5},DC:{r:1,c:3} },
    Ofensivo:   { POR:{r:6,c:3},LI:{r:5,c:1},DFC1:{r:5,c:2},DFC2:{r:5,c:4},LD:{r:5,c:5},MCD:{r:4.3,c:3},MC1:{r:3.3,c:1.8},MC2:{r:3.3,c:4.2},MP1:{r:2.2,c:2},MP2:{r:2.2,c:4},DC:{r:1,c:3} },
    Defensivo:  { POR:{r:6,c:3},LI:{r:5,c:1},DFC1:{r:5,c:2},DFC2:{r:5,c:4},LD:{r:5,c:5},MI:{r:3.5,c:1},MCD1:{r:4,c:2},MC:{r:4,c:3},MCD2:{r:4,c:4},MD:{r:3.5,c:5},DC:{r:1,c:3} },
  },
  "3-4-3": {
    name: "3-4-3 Total",
    Equilibrado: { POR:{r:6,c:3},DFC1:{r:5,c:1.5},DFC2:{r:5,c:3},DFC3:{r:5,c:4.5},MI:{r:4,c:1},MC1:{r:4,c:2.3},MC2:{r:4,c:3.7},MD:{r:4,c:5},EI:{r:1,c:1},DC:{r:1,c:3},ED:{r:1,c:5} },
    Ofensivo:   { POR:{r:6,c:3},DFC1:{r:5,c:1.5},DFC2:{r:5,c:3},DFC3:{r:5,c:4.5},MI:{r:4,c:1},MC:{r:4,c:2.2},MP:{r:3,c:3.8},MD:{r:4,c:5},EI:{r:1,c:1},DC:{r:1,c:3},ED:{r:1,c:5} },
    Defensivo:  { POR:{r:6,c:3},DFC1:{r:5,c:1.5},DFC2:{r:5,c:3},DFC3:{r:5,c:4.5},MI:{r:4,c:1},MCD:{r:4,c:2.2},MC:{r:4,c:3.8},MD:{r:4,c:5},EI:{r:1,c:1},DC:{r:1,c:3},ED:{r:1,c:5} },
  },
};

// ─── LEAGUE ENGINE ────────────────────────────────────────────────────────────

// Pick 19 rival teams from pools, no repeated club names
function pickRivals(pools, count = 19) {
  const usedClubs = new Set();
  const shuffled = [...pools].sort(() => Math.random() - 0.5);
  const picked = [];
  for (const pool of shuffled) {
    // Extract club name = everything before the last " XXXX" year token
    const clubName = pool.team.replace(/\s+\d{4}$/, "").trim();
    if (!usedClubs.has(clubName)) {
      usedClubs.add(clubName);
      const ovr = Math.round(pool.players.reduce((s, p) => s + p.ovr, 0) / pool.players.length);
      picked.push({ id: pool.team, name: pool.team, clubName, year: String(pool.year || ""), ovr, players: pool.players });
      if (picked.length === count) break;
    }
  }
  // If not enough unique clubs, fill with remaining (allow repeats)
  if (picked.length < count) {
    for (const pool of shuffled) {
      if (picked.length >= count) break;
      if (!picked.find(p => p.id === pool.team)) {
        const ovr = Math.round(pool.players.reduce((s, p) => s + p.ovr, 0) / pool.players.length);
        picked.push({ id: pool.team, name: pool.team, clubName: pool.team, year: String(pool.year || ""), ovr, players: pool.players });
      }
    }
  }
  return picked;
}

// Generate a full round-robin schedule (home + away = 38 matchdays for 20 teams)
function generateSchedule(teams) {
  const n = teams.length; // 20
  const rounds = [];
  const ids = teams.map(t => t.id);
  // Standard round-robin rotation
  for (let round = 0; round < n - 1; round++) {
    const matches = [];
    for (let i = 0; i < n / 2; i++) {
      const home = ids[i];
      const away = ids[n - 1 - i];
      matches.push({ home, away });
    }
    rounds.push(matches);
    // rotate all except first
    ids.splice(1, 0, ids.pop());
  }
  // Return legs: first half = home, second half = reverse
  const leg1 = rounds;
  const leg2 = rounds.map(r => r.map(m => ({ home: m.away, away: m.home })));
  return [...leg1, ...leg2];
}

// Simulate a single match between two teams by OVR
function simulateMatch(teamA, ovrA, teamB, ovrB) {
  const diff = (ovrA - ovrB) / 10;
  const baseGoals = 1.4;
  const randGoals = () => Math.max(0, Math.round((baseGoals + (Math.random() * 2.5 - 0.5)) + diff * 0.3 + (Math.random() - 0.5)));
  const goalsA = randGoals();
  const goalsB = Math.max(0, Math.round((baseGoals + (Math.random() * 2.5 - 0.5)) - diff * 0.3 + (Math.random() - 0.5)));

  // Pick scorers
  const getScorers = (players, goals) => {
    if (!goals || !players?.length) return [];
    const attackers = players.filter(p => {
      const pos = Array.isArray(p.pos) ? p.pos : [p.pos];
      return pos.some(x => ["DC","EI","ED","MP","MC"].includes(x));
    });
    const pool = attackers.length > 0 ? attackers : players;
    const scorers = [];
    for (let i = 0; i < goals; i++) {
      const p = pool[Math.floor(Math.random() * pool.length)];
      scorers.push(p.name.split(" ").slice(-1)[0]); // last name
    }
    return scorers;
  };

  return {
    goalsA,
    goalsB,
    scorersA: getScorers(teamA.players, goalsA),
    scorersB: getScorers(teamB.players, goalsB),
  };
}

// Build initial standings table
function buildStandings(teams) {
  return teams.map(t => {
    // Prefer explicit year field; fall back to parsing name e.g. "FC Barcelona 2005"
    const year = t.year || (t.name.match(/\s+(\d{4})$/)?.[1] ?? null);
    const displayName = year
      ? t.name.replace(/\s+\d{4}$/, "").trim()
      : t.name;
    return {
      id: t.id, name: t.name, displayName, year, ovr: t.ovr,
      pts: 0, pj: 0, pg: 0, pe: 0, pp: 0, gf: 0, gc: 0,
    };
  });
}

// Sort standings: pts desc, then GD desc, then GF desc
function sortStandings(standings) {
  return [...standings].sort((a, b) => {
    if (b.pts !== a.pts) return b.pts - a.pts;
    const gdA = a.gf - a.gc, gdB = b.gf - b.gc;
    if (gdB !== gdA) return gdB - gdA;
    return b.gf - a.gf;
  });
}

// ─── COMPONENT ───────────────────────────────────────────────────────────────
export default function Play() {
  // ── Draft state ──
  const [availablePools, setAvailablePools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFormation, setSelectedFormation] = useState("4-3-3");
  const [selectedStyle, setSelectedStyle] = useState("Equilibrado");
  const [isConfigConfirmed, setIsConfigConfirmed] = useState(false);
  const [lineup, setLineup] = useState({});
  const [currentRoll, setCurrentRoll] = useState(null);
  const [availablePlayers, setAvailablePlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [isRolling, setIsRolling] = useState(false);
  const [draggedSlot, setDraggedSlot] = useState(null);
  const pitchRef = useRef(null);

  // ── League state ──
  const [leaguePhase, setLeaguePhase] = useState(null); // null | "ready" | "playing" | "finished"
  const [leagueTeams, setLeagueTeams] = useState([]);   // 20 teams including player
  const [schedule, setSchedule] = useState([]);          // 38 matchdays
  const [standings, setStandings] = useState([]);
  const [currentMatchday, setCurrentMatchday] = useState(0); // 0-indexed
  const [matchdayResult, setMatchdayResult] = useState(null); // last played matchday result
  const [leagueLoading, setLeagueLoading] = useState(false);

  const PLAYER_TEAM_ID = "__PLAYER__";
  const API_URL = import.meta.env.DEV
  ? '/api/wp-json/goatxi/v1/pools'
  : 'https://ivory-mantis-732441.hostingersite.com/wp-json/goatxi/v1/pools';
  // ── Fetch pools ──
  useEffect(() => {
    const fetch_ = async () => {
      try {
        setLoading(true);
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("No se pudo sincronizar la base de datos de GOATXI.");
        const data = await res.json();
        setAvailablePools(data);
        //BORRAR ESTO DESPUES
        console.log(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetch_();
  }, []);

  const currentPitchLayout = FORMATIONS_DATA[selectedFormation][selectedStyle];

  useEffect(() => {
    if (!isConfigConfirmed) {
      const initial = {};
      Object.keys(currentPitchLayout).forEach(s => { initial[s] = null; });
      setLineup(initial);
    }
  }, [selectedFormation, selectedStyle, isConfigConfirmed]);

  if (loading) return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center font-heading p-6">
      <div className="w-10 h-10 border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mb-4" />
      <h2 className="text-sm font-bold uppercase tracking-widest text-foreground animate-pulse">Cargando base de datos histórica...</h2>
      <p className="text-xs text-muted-foreground mt-1">Conectando con el vestuario de GOATXI</p>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center font-heading text-center p-6">
      <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-6 py-4 rounded-3xl max-w-sm">
        <h2 className="text-sm font-bold uppercase tracking-widest mb-1">¡Error de conexión!</h2>
        <p className="text-xs opacity-80 mb-4">{error}</p>
        <button onClick={() => window.location.reload()} className="bg-neutral-900 text-white text-xs px-4 py-2 rounded-xl border border-neutral-800 font-bold hover:bg-neutral-800 transition-colors">Reintentar Conexión</button>
      </div>
    </div>
  );

  // ─── Helpers ──────────────────────────────────────────────────────────────
  const isPositionCompatible = (playerPos, slotKey) => {
    const cleanSlot = slotKey.replace(/[0-9]/g, "");
    const positions = Array.isArray(playerPos) ? playerPos : [playerPos];
    return positions.some(p => p === cleanSlot);
  };

  const calculateTeamOvr = () => {
    const active = Object.values(lineup).filter(Boolean);
    if (!active.length) return 0;
    return Math.round(active.reduce((s, p) => s + p.ovr, 0) / active.length);
  };
  const currentTeamOvr = calculateTeamOvr();

  const isLineupComplete = isConfigConfirmed &&
    Object.values(lineup).length > 0 &&
    Object.values(lineup).every(s => s !== null);

  // ─── Draft handlers ────────────────────────────────────────────────────────
  const handleConfirmConfig = () => setIsConfigConfirmed(true);

  const handleRollDice = () => {
    if (!availablePools.length) return;
    setIsRolling(true);
    setSelectedPlayer(null);
    setTimeout(() => {
      const pool = availablePools[Math.floor(Math.random() * availablePools.length)];
      setCurrentRoll({ country: pool.team, year: pool.year });
      setAvailablePlayers(pool.players);
      setIsRolling(false);
    }, 1000);
  };

  const handlePlacePlayer = (slotKey) => {
    if (!selectedPlayer) return;
    if (Object.values(lineup).some(p => p?.id === selectedPlayer.id)) {
      alert("¡Este jugador ya está en tu once inicial!");
      return;
    }
    setLineup(prev => ({ ...prev, [slotKey]: selectedPlayer }));
    setCurrentRoll(null);
    setAvailablePlayers([]);
    setSelectedPlayer(null);
  };

  const handleSwap = (fromSlot, toSlot) => {
    if (fromSlot === toSlot) return;
    const a = lineup[fromSlot], b = lineup[toSlot];
    if (!a || !b) return;
    if (!isPositionCompatible(a.pos, toSlot) || !isPositionCompatible(b.pos, fromSlot)) return;
    setLineup(prev => ({ ...prev, [fromSlot]: b, [toSlot]: a }));
  };

  const handleResetAll = () => {
    setLineup({});
    setCurrentRoll(null);
    setAvailablePlayers([]);
    setSelectedPlayer(null);
    setIsConfigConfirmed(false);
    setLeaguePhase(null);
    setLeagueTeams([]);
    setSchedule([]);
    setStandings([]);
    setCurrentMatchday(0);
    setMatchdayResult(null);
  };

  // ─── League handlers ───────────────────────────────────────────────────────
  const handleStartLeague = () => {
    setLeagueLoading(true);
    setTimeout(() => {
      const playerTeam = {
        id: PLAYER_TEAM_ID,
        name: "TU EQUIPO",
        clubName: "TU EQUIPO",
        ovr: currentTeamOvr,
        players: Object.values(lineup).filter(Boolean),
      };
      const rivals = pickRivals(availablePools, 19);
      const allTeams = [playerTeam, ...rivals];
      const sched = generateSchedule(allTeams);
      setLeagueTeams(allTeams);
      setSchedule(sched);
      setStandings(buildStandings(allTeams));
      setCurrentMatchday(0);
      setMatchdayResult(null);
      setLeaguePhase("playing");
      setLeagueLoading(false);
    }, 800);
  };

  const handlePlayMatchday = () => {
    if (currentMatchday >= schedule.length) return;
    const matchday = schedule[currentMatchday];
    const newStandings = [...standings];
    const results = [];

    const updateTeam = (id, gf, gc) => {
      const t = newStandings.find(x => x.id === id);
      if (!t) return;
      t.pj += 1; t.gf += gf; t.gc += gc;
      if (gf > gc) { t.pts += 3; t.pg += 1; }
      else if (gf === gc) { t.pts += 1; t.pe += 1; }
      else { t.pp += 1; }
    };

    for (const match of matchday) {
      const tHome = leagueTeams.find(t => t.id === match.home);
      const tAway = leagueTeams.find(t => t.id === match.away);
      if (!tHome || !tAway) continue;
      const res = simulateMatch(tHome, tHome.ovr, tAway, tAway.ovr);
      updateTeam(match.home, res.goalsA, res.goalsB);
      updateTeam(match.away, res.goalsB, res.goalsA);

      const isPlayerMatch = match.home === PLAYER_TEAM_ID || match.away === PLAYER_TEAM_ID;
      if (isPlayerMatch) {
        const playerIsHome = match.home === PLAYER_TEAM_ID;
        results.push({
          isPlayerMatch: true,
          playerIsHome,
          homeName: tHome.name,
          awayName: tAway.name,
          homeGoals: res.goalsA,
          awayGoals: res.goalsB,
          scorersHome: res.scorersA,
          scorersAway: res.scorersB,
        });
      }
    }

    setStandings(sortStandings(newStandings));
    setMatchdayResult({ jornada: currentMatchday + 1, playerMatch: results[0] || null });
    setCurrentMatchday(prev => prev + 1);
    if (currentMatchday + 1 >= schedule.length) setLeaguePhase("finished");
  };

  // ─── LEAGUE VIEW ──────────────────────────────────────────────────────────
  if (leaguePhase === "playing" || leaguePhase === "finished") {
    const playerRow = standings.find(s => s.id === PLAYER_TEAM_ID);
    const playerPos = standings.findIndex(s => s.id === PLAYER_TEAM_ID) + 1;
    const pm = matchdayResult?.playerMatch;

    return (
      <div className="min-h-screen bg-background text-foreground font-body pb-16">
        <div className="fixed inset-0 pointer-events-none opacity-[0.015]"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}
        />
        <header className="max-w-6xl mx-auto pt-8 pb-4 px-6 flex items-center justify-between relative z-10">
          <button onClick={handleResetAll} className="inline-flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" /> Abandonar liga
          </button>
          <div className="bg-neutral-900 border border-neutral-800 px-4 py-2 rounded-2xl text-xs font-heading font-bold text-white shadow-md">
            J<span className="text-primary">{Math.min(currentMatchday, 38)}</span>/38
            {playerRow && <span className="ml-3">· <span className="text-primary">{playerRow.pts}</span> pts</span>}
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-6 mt-2 grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">

          {/* LEFT: match result + next button */}
          <div className="lg:col-span-5 flex flex-col gap-4">

            {/* Player match result card */}
            {matchdayResult && pm && (
              <motion.div key={matchdayResult.jornada} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                className="bg-white/80 backdrop-blur-sm border border-border rounded-3xl p-6 shadow-xl">
                <p className="text-[10px] font-heading font-bold text-muted-foreground uppercase tracking-[0.2em] mb-3">
                  Jornada {matchdayResult.jornada} · Tu partido
                </p>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex-1 text-right">
                    <p className={`text-sm font-heading font-bold leading-tight ${pm.playerIsHome ? "text-primary" : "text-foreground"}`}>
                      {pm.homeName}
                    </p>
                    {pm.scorersHome.length > 0 && (
                      <p className="text-[10px] text-muted-foreground mt-1">{pm.scorersHome.join(", ")}</p>
                    )}
                  </div>
                  <div className="shrink-0 text-center">
                    <p className="text-3xl font-heading font-black text-foreground tracking-tight">
                      {pm.homeGoals} – {pm.awayGoals}
                    </p>
                    {(() => {
                      const playerGoals = pm.playerIsHome ? pm.homeGoals : pm.awayGoals;
                      const rivalGoals = pm.playerIsHome ? pm.awayGoals : pm.homeGoals;
                      const label = playerGoals > rivalGoals ? "VICTORIA" : playerGoals < rivalGoals ? "DERROTA" : "EMPATE";
                      const cls = playerGoals > rivalGoals ? "bg-green-500" : playerGoals < rivalGoals ? "bg-red-500" : "bg-yellow-500";
                      return <span className={`text-[9px] font-heading font-black px-2 py-0.5 rounded-md text-white ${cls}`}>{label}</span>;
                    })()}
                  </div>
                  <div className="flex-1 text-left">
                    <p className={`text-sm font-heading font-bold leading-tight ${!pm.playerIsHome ? "text-primary" : "text-foreground"}`}>
                      {pm.awayName}
                    </p>
                    {pm.scorersAway.length > 0 && (
                      <p className="text-[10px] text-muted-foreground mt-1">{pm.scorersAway.join(", ")}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {matchdayResult && !pm && (
              <div className="bg-white/80 backdrop-blur-sm border border-border rounded-3xl p-5 shadow-xl text-center">
                <p className="text-[10px] font-heading font-bold text-muted-foreground uppercase tracking-[0.2em]">Jornada {matchdayResult.jornada}</p>
                <p className="text-sm font-heading text-muted-foreground mt-1">Descansabas esta jornada.</p>
              </div>
            )}

            {/* Next matchday / finish */}
            {leaguePhase === "playing" && (
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                onClick={handlePlayMatchday}
                className="w-full bg-neutral-900 hover:bg-neutral-800 text-white font-heading font-bold text-sm py-4 rounded-2xl flex items-center justify-center gap-2 border border-neutral-800 shadow-xl cursor-pointer">
                <ChevronRight className="w-5 h-5 text-primary" />
                Jugar Jornada {currentMatchday + 1}
              </motion.button>
            )}

            {leaguePhase === "finished" && (
              <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                className={`p-6 rounded-3xl border shadow-xl text-center ${playerPos === 1 ? "border-yellow-400 bg-yellow-50" : "bg-white border-border"}`}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 bg-primary/10">
                  {playerPos === 1 ? <Trophy className="w-6 h-6 text-yellow-500" /> : <Medal className="w-6 h-6 text-primary" />}
                </div>
                <p className="text-[10px] font-heading font-bold text-muted-foreground uppercase tracking-widest">Temporada finalizada</p>
                <p className="text-3xl font-heading font-black text-foreground mt-1">
                  {playerPos === 1 ? "¡CAMPEÓN!" : `${playerPos}º clasificado`}
                </p>
                {playerRow && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {playerRow.pts} pts · {playerRow.gf} GF · {playerRow.gc} GC
                  </p>
                )}
                <button onClick={handleResetAll}
                  className="mt-4 text-xs font-heading font-bold text-neutral-900 underline underline-offset-4 hover:text-primary transition-colors cursor-pointer">
                  Nueva temporada
                </button>
              </motion.div>
            )}

            {/* Player stats summary */}
            {playerRow && (
              <div className="bg-white/80 backdrop-blur-sm border border-border rounded-3xl p-4 shadow-xl">
                <p className="text-[10px] font-heading font-bold text-muted-foreground uppercase tracking-[0.2em] mb-3">Tu equipo</p>
                <div className="grid grid-cols-5 gap-2 text-center">
                  {[["PJ", playerRow.pj], ["PG", playerRow.pg], ["PE", playerRow.pe], ["PP", playerRow.pp], ["PTS", playerRow.pts]].map(([label, val]) => (
                    <div key={label} className="bg-neutral-50 rounded-xl p-2">
                      <p className="text-[9px] font-heading text-muted-foreground uppercase">{label}</p>
                      <p className="text-base font-heading font-black text-foreground">{val}</p>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-2 text-center mt-2">
                  {[["GF", playerRow.gf], ["GC", playerRow.gc], ["GD", playerRow.gf - playerRow.gc]].map(([label, val]) => (
                    <div key={label} className="bg-neutral-50 rounded-xl p-2">
                      <p className="text-[9px] font-heading text-muted-foreground uppercase">{label}</p>
                      <p className={`text-base font-heading font-black ${label === "GD" ? (val >= 0 ? "text-green-600" : "text-red-500") : "text-foreground"}`}>{val > 0 && label === "GD" ? `+${val}` : val}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: full standings table */}
          <div className="lg:col-span-7">
            <div className="bg-white/80 backdrop-blur-sm border border-border rounded-3xl p-4 shadow-xl">
              <h2 className="text-xs font-heading font-bold text-primary uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                <Swords className="w-3.5 h-3.5" /> CLASIFICACIÓN
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-[11px] font-heading">
                  <thead>
                    <tr className="text-muted-foreground uppercase tracking-wider text-[9px]">
                      <th className="text-left pb-2 pr-1 w-6">#</th>
                      <th className="text-left pb-2">Equipo</th>
                      <th className="text-center pb-2 px-1">PJ</th>
                      <th className="text-center pb-2 px-1">PG</th>
                      <th className="text-center pb-2 px-1">PE</th>
                      <th className="text-center pb-2 px-1">PP</th>
                      <th className="text-center pb-2 px-1">GF</th>
                      <th className="text-center pb-2 px-1">GC</th>
                      <th className="text-center pb-2 px-1">GD</th>
                      <th className="text-center pb-2 font-black text-foreground">PTS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {standings.map((team, i) => {
                      const isPlayer = team.id === PLAYER_TEAM_ID;
                      const gd = team.gf - team.gc;
                      return (
                        <tr key={team.id} className={`border-t border-border/50 ${isPlayer ? "bg-primary/5" : ""}`}>
                          <td className={`py-1.5 pr-1 font-black ${i === 0 ? "text-yellow-500" : i < 4 ? "text-blue-500" : i >= 17 ? "text-red-400" : "text-muted-foreground"}`}>{i + 1}</td>
                          <td className={`py-1.5 ${isPlayer ? "font-black text-primary" : "font-bold text-foreground"}`}>
                            {isPlayer ? (
                              <span>⚽ TU EQUIPO</span>
                            ) : (
                              <span className="flex items-baseline gap-1.5">
                                <span className="truncate max-w-[100px] inline-block">{team.displayName || team.name}</span>
                                {team.year && <span className="text-[9px] font-heading font-bold text-muted-foreground shrink-0">{team.year}</span>}
                              </span>
                            )}
                          </td>
                          <td className="text-center py-1.5 px-1 text-muted-foreground">{team.pj}</td>
                          <td className="text-center py-1.5 px-1">{team.pg}</td>
                          <td className="text-center py-1.5 px-1">{team.pe}</td>
                          <td className="text-center py-1.5 px-1">{team.pp}</td>
                          <td className="text-center py-1.5 px-1">{team.gf}</td>
                          <td className="text-center py-1.5 px-1">{team.gc}</td>
                          <td className={`text-center py-1.5 px-1 ${gd > 0 ? "text-green-600" : gd < 0 ? "text-red-400" : "text-muted-foreground"}`}>
                            {gd > 0 ? `+${gd}` : gd}
                          </td>
                          <td className="text-center py-1.5 font-black text-foreground">{team.pts}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <div className="mt-3 pt-3 border-t border-border/50 flex gap-4 text-[9px] font-heading text-muted-foreground">
                  <span><span className="text-yellow-500 font-black">■</span> Campeón</span>
                  <span><span className="text-blue-500 font-black">■</span> Europa</span>
                  <span><span className="text-red-400 font-black">■</span> Descenso</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // ─── DRAFT VIEW (original) ─────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden relative font-body pb-12">
      <div className="fixed inset-0 pointer-events-none opacity-[0.015]"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}
      />

      <header className="max-w-6xl mx-auto pt-8 pb-4 px-6 flex items-center justify-between relative z-10">
        <Link to="/" className="inline-flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" /> Volver al inicio
        </Link>
        {isConfigConfirmed && (
          <div className="bg-neutral-900 border border-neutral-800 px-4 py-2 rounded-2xl text-xs font-heading font-bold text-white shadow-md">
            ⚽ TEAM OVR: <span className="text-primary text-sm ml-1 font-black">{currentTeamOvr}</span>
          </div>
        )}
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 px-6 mt-4 relative z-10 items-start">

        {/* ── LEFT PANEL ── */}
        <div className="lg:col-span-4 flex flex-col gap-6">

          {/* Tactical config (pre-confirm) */}
          <AnimatePresence>
            {!isConfigConfirmed && (
              <motion.div key="tactical-config" initial={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0, marginBottom: 0 }} transition={{ duration: 0.35, ease: "easeInOut" }} className="overflow-hidden">
                <div className="bg-white/80 backdrop-blur-sm border border-border rounded-3xl p-6 shadow-xl">
                  <h2 className="text-xs font-heading font-bold text-primary uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                    <Sliders className="w-3.5 h-3.5" /> AJUSTES TÁCTICOS PRE-PARTIDO
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="text-[11px] font-heading font-bold text-muted-foreground uppercase tracking-wider block mb-2">Formación Base</label>
                      <div className="grid grid-cols-3 gap-2">
                        {Object.keys(FORMATIONS_DATA).map(form => (
                          <button key={form} onClick={() => setSelectedFormation(form)}
                            className={`py-2.5 px-3 text-xs font-heading font-bold rounded-xl border transition-all duration-150 ${selectedFormation === form ? "bg-neutral-900 border-neutral-900 text-white" : "bg-white border-border text-foreground hover:border-muted-foreground/30"}`}>
                            {form}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-[11px] font-heading font-bold text-muted-foreground uppercase tracking-wider block mb-2">Estilo de Juego</label>
                      <div className="grid grid-cols-3 gap-2">
                        {["Defensivo", "Equilibrado", "Ofensivo"].map(style => (
                          <button key={style} onClick={() => setSelectedStyle(style)}
                            className={`py-2.5 px-2 text-xs font-heading font-bold rounded-xl border transition-all duration-150 ${selectedStyle === style ? "bg-neutral-900 border-neutral-900 text-white" : "bg-white border-border text-foreground hover:border-muted-foreground/30"}`}>
                            {style}
                          </button>
                        ))}
                      </div>
                    </div>
                    <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} onClick={handleConfirmConfig}
                      className="w-full bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-heading font-bold py-3.5 rounded-xl border border-neutral-800 shadow-md transition-colors mt-2 cursor-pointer">
                      CONFIRMAR E INICIAR DRAFT
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {isConfigConfirmed && (
            <>
              {/* Tactic summary */}
              <div className="bg-white/80 backdrop-blur-sm border border-border rounded-3xl p-5 shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-heading font-bold text-muted-foreground uppercase tracking-[0.2em]">Táctica activa</p>
                    <p className="text-sm font-heading font-black text-foreground mt-0.5">{selectedFormation} <span className="text-primary">· {selectedStyle}</span></p>
                  </div>
                  <button onClick={handleResetAll} className="text-[10px] font-heading font-bold text-muted-foreground hover:text-foreground underline underline-offset-2 transition-colors cursor-pointer">
                    Cambiar táctica
                  </button>
                </div>
              </div>

              {/* Step 1: Roll dice */}
              <div className="bg-white/80 backdrop-blur-sm border border-border rounded-3xl p-6 shadow-xl">
                <h2 className="text-xs font-heading font-bold text-primary uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5" /> PASO 1: TIRAR EL DADO
                </h2>
                {!currentRoll && !isLineupComplete && (
                  <div className="py-2">
                    <p className="text-sm text-muted-foreground mb-6 leading-relaxed">Sortea un país y un Mundial clásico para desbloquear los cracks históricos de ese torneo.</p>
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleRollDice} disabled={isRolling}
                      className="w-full bg-neutral-900 hover:bg-neutral-800 text-white font-heading font-bold text-sm py-4 px-6 rounded-2xl flex items-center justify-center gap-2.5 shadow-xl border border-neutral-800 cursor-pointer disabled:opacity-50">
                      <Dices className={`w-5 h-5 text-primary ${isRolling ? "animate-spin" : ""}`} />
                      {isRolling ? "SORTEANDO ERA..." : "TIRAR DADO"}
                    </motion.button>
                  </div>
                )}
                {isRolling && (
                  <div className="flex flex-col items-center justify-center py-8">
                    <div className="w-8 h-8 border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mb-3" />
                    <p className="text-xs font-heading font-bold text-muted-foreground uppercase tracking-widest animate-pulse">Rebuscando en el archivo...</p>
                  </div>
                )}
                {currentRoll && !isRolling && (
                  <div className="bg-border/30 border border-border rounded-2xl p-5 text-center">
                    <span className="text-[10px] font-heading font-bold uppercase tracking-[0.2em] text-primary block mb-1">DRAFT DESBLOQUEADO</span>
                    <h3 className="text-3xl font-heading font-black text-foreground tracking-tight">{currentRoll.country} <span className="text-primary">{currentRoll.year}</span></h3>
                    <p className="text-xs text-muted-foreground mt-1.5">Elige un jugador e insértalo en su posición brillante.</p>
                  </div>
                )}
                {isLineupComplete && (
                  <div className="bg-border/20 border border-border rounded-2xl p-5 text-center">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Trophy className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-base font-heading font-bold text-foreground uppercase">¡Plantilla Preparada!</h3>
                    <p className="text-xs text-muted-foreground mt-1 mb-5">Has completado tu XI ideal usando el esquema {selectedFormation}.</p>
                    {leagueLoading ? (
                      <div className="flex flex-col items-center py-2">
                        <div className="w-7 h-7 border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mb-2" />
                        <p className="text-xs text-muted-foreground font-heading animate-pulse">Generando liga...</p>
                      </div>
                    ) : (
                      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleStartLeague}
                        className="w-full bg-neutral-900 hover:bg-neutral-800 text-white font-heading font-bold text-sm py-4 rounded-2xl flex items-center justify-center gap-2 border border-neutral-800 shadow-xl cursor-pointer">
                        <Sparkles className="w-4 h-4 text-primary" /> INICIAR LIGA
                      </motion.button>
                    )}
                  </div>
                )}
              </div>

              {/* Step 2: Pick player */}
              <AnimatePresence mode="wait">
                {currentRoll && availablePlayers.length > 0 && (
                  <motion.div key="player-select" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}
                    className="bg-white/80 backdrop-blur-sm border border-border rounded-3xl p-6 shadow-xl">
                    <h2 className="text-xs font-heading font-bold text-primary uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                      <Shield className="w-3.5 h-3.5" /> PASO 2: SELECCIONA UN JUGADOR
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {availablePlayers.map(player => {
                        const isAlreadyPlaced = Object.values(lineup).some(p => p?.id === player.id);
                        const hasAvailableSlot = Object.entries(lineup).some(([sk, occ]) => occ === null && isPositionCompatible(player.pos, sk));
                        const isDisabled = isAlreadyPlaced || !hasAvailableSlot;
                        const isSelected = selectedPlayer?.id === player.id;
                        const disabledReason = isAlreadyPlaced ? "Ya en el campo" : !hasAvailableSlot ? "Sin hueco disponible" : null;
                        return (
                          <div key={player.id}
                            onClick={() => { if (!isDisabled) { setSelectedPlayer(player); pitchRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }); } }}
                            className={`p-4 rounded-2xl border text-left transition-all duration-200 relative flex flex-col justify-between h-28 ${isDisabled ? "bg-neutral-100 border-neutral-200 opacity-50 cursor-not-allowed grayscale" : isSelected ? "bg-border/60 border-primary shadow-md cursor-pointer" : "bg-white border-border hover:border-muted-foreground/40 shadow-sm cursor-pointer"}`}>
                            <div className="flex justify-between items-start">
                              <span className="text-2xl font-heading font-black text-foreground leading-none">{player.ovr}</span>
                              <span className="text-[10px] font-heading font-bold bg-neutral-900 px-2 py-0.5 rounded-lg text-white">
                                {Array.isArray(player.pos) ? player.pos.join("/") : player.pos}
                              </span>
                            </div>
                            <div>
                              <p className="text-sm font-heading font-bold text-foreground truncate">{player.name}</p>
                              <p className="text-[10px] text-muted-foreground">{disabledReason ?? `Dorsal #${player.active}`}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}
        </div>

        {/* ── PITCH ── */}
        <div className="lg:col-span-5 flex justify-center">
          <div ref={pitchRef} className="w-full max-w-[480px] aspect-[3/4] bg-neutral-900 border border-neutral-800 rounded-3xl p-4 relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 24px, rgba(255,255,255,0.1) 24px, rgba(255,255,255,0.1) 48px)" }} />
            <div className="absolute inset-4 border border-white/5 pointer-events-none rounded-2xl" />
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-40 h-20 border-b border-x border-white/5 pointer-events-none" />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-40 h-20 border-t border-x border-white/5 pointer-events-none" />
            <div className="absolute top-1/2 left-0 right-0 h-px bg-white/5 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 border border-white/5 rounded-full pointer-events-none" />
            <div className="absolute inset-4 z-20">
              {Object.entries(currentPitchLayout).map(([slotKey, coords]) => {
                const player = lineup[slotKey];
                const isCompatible = selectedPlayer && isPositionCompatible(selectedPlayer.pos, slotKey);
                const minLeft = 8, maxLeft = 92, minTop = 8, maxTop = 92;
                const leftPercent = minLeft + ((coords.c - 1) / 4) * (maxLeft - minLeft);
                const topPercent = minTop + ((coords.r - 1) / 5) * (maxTop - minTop);
                const draggedPlayer = draggedSlot ? lineup[draggedSlot] : null;
                const isSwapTarget = draggedSlot && draggedSlot !== slotKey && player && draggedPlayer &&
                  isPositionCompatible(draggedPlayer.pos, slotKey) && isPositionCompatible(player.pos, draggedSlot);
                return (
                  <button key={slotKey}
                    disabled={!isConfigConfirmed || (!isCompatible && !player)}
                    draggable={!!player}
                    onDragStart={() => player && setDraggedSlot(slotKey)}
                    onDragEnd={() => setDraggedSlot(null)}
                    onDragOver={e => { if (isSwapTarget) e.preventDefault(); }}
                    onDrop={e => { e.preventDefault(); if (isSwapTarget && draggedSlot) handleSwap(draggedSlot, slotKey); }}
                    onClick={() => { if (!player && isCompatible) handlePlacePlayer(slotKey); }}
                    style={{ left: `${leftPercent}%`, top: `${topPercent}%` }}
                    className={`absolute w-14 h-20 rounded-xl border flex flex-col items-center justify-center p-1 transition-all duration-300 ease-out select-none -translate-x-1/2 -translate-y-1/2 ${
                      isSwapTarget ? "bg-yellow-400/30 border-yellow-400 text-yellow-300 scale-105 z-30 cursor-copy"
                      : player ? `bg-neutral-800 border-primary text-white shadow-md ${draggedSlot === slotKey ? "opacity-40 scale-95" : "cursor-grab"}`
                      : isCompatible ? "bg-primary/25 border-primary text-primary animate-pulse cursor-pointer scale-105 z-30"
                      : "bg-black/40 border-white/10 text-neutral-500"
                    }`}>
                    {player ? (
                      <>
                        <span className="text-[11px] font-heading font-black text-primary">{player.ovr}</span>
                        <p className="text-[9px] font-heading font-bold text-center leading-tight truncate w-full mt-0.5 px-0.5">{player.name.split(" ")[0]}</p>
                        <span className="text-[8px] font-body text-muted-foreground uppercase mt-0.5">{slotKey.replace(/[0-9]/g, "")}</span>
                      </>
                    ) : (
                      <span className="text-[10px] font-heading font-bold opacity-70">{slotKey.replace(/[0-9]/g, "")}</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── ROSTER PANEL ── */}
        <div className="lg:col-span-3 flex flex-col gap-3">
          <div className="bg-white/80 backdrop-blur-sm border border-border rounded-3xl p-4 shadow-xl">
            <h2 className="text-xs font-heading font-bold text-primary uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
              <Trophy className="w-3.5 h-3.5" /> PLANTILLA
            </h2>
            <div className="flex flex-col gap-2">
              {Object.entries(currentPitchLayout).map(([slotKey]) => {
                const player = lineup[slotKey];
                const posLabel = slotKey.replace(/[0-9]/g, "");
                return (
                  <div key={slotKey} className={`flex items-center gap-2.5 p-2.5 rounded-xl border transition-all duration-300 ${player ? "bg-neutral-900 border-neutral-800" : "bg-neutral-50 border-dashed border-neutral-200"}`}>
                    <span className={`text-[9px] font-heading font-black w-8 text-center shrink-0 py-0.5 rounded-md ${player ? "bg-primary/20 text-primary" : "bg-neutral-200 text-neutral-400"}`}>{posLabel}</span>
                    {player ? (
                      <>
                        <div className="flex-1 min-w-0"><p className="text-[11px] font-heading font-bold text-white truncate leading-tight">{player.name}</p></div>
                        <span className="text-[11px] font-heading font-black text-primary shrink-0">{player.ovr}</span>
                      </>
                    ) : (
                      <p className="text-[10px] font-heading text-neutral-400 italic flex-1">Vacante</p>
                    )}
                  </div>
                );
              })}
            </div>
            {isConfigConfirmed && (
              <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
                <span className="text-[10px] font-heading font-bold text-muted-foreground uppercase tracking-wider">OVR Medio</span>
                <span className="text-lg font-heading font-black text-foreground">{currentTeamOvr > 0 ? currentTeamOvr : "—"}</span>
              </div>
            )}
          </div>
        </div>

      </main>
    </div>
  );
}