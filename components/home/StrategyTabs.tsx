export type Strat = { num: string; name: string; tag: string; head: string; body: string; points: string[]; cta: string; href: string };

/** All five panels are in the HTML (crawlable); site.js switches them. */
export function StrategyTabs({ items }: { items: Strat[] }) {
  return (
    <div className="strats" data-rv="up" data-tabs="">
      <div role="tablist" aria-label="Investment strategies" className="strat-list">
        {items.map((s, k) => (
          <button key={s.name} type="button" role="tab" id={`st-tab-${k}`} aria-selected={k === 0} aria-controls={`st-${k}`} data-panel={`st-${k}`} className={`strat${k === 0 ? ' on' : ''}`}>
            <span className="n">{s.num}</span>{s.name}
          </button>
        ))}
      </div>
      <div className="strat-panel">
        {items.map((cur, k) => (
          <div key={cur.name} id={`st-${k}`} role="tabpanel" aria-labelledby={`st-tab-${k}`} hidden={k !== 0}>
            <div className="ghostnum disp" aria-hidden="true">{cur.num}</div>
            <div className="sp-in swap-b">
              <span className="mono sp-tag">{cur.tag}</span>
              <h3 className="disp">{cur.head}</h3>
              <p>{cur.body}</p>
              <ul>{cur.points.map((p) => <li key={p}>{p}</li>)}</ul>
              <a href={cur.href} className="tlink">{cur.cta}</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
