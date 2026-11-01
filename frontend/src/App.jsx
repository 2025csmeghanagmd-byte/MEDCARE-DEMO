import { useState } from "react";
import { Activity, HeartPulse, Mail, Lock, Eye, EyeOff, ShieldCheck, Stethoscope } from "lucide-react";

export default function App() {
  const [email, setEmail] = useState("admin@medcare.com");
  const [password, setPassword] = useState("medcare123");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    setLoading(true);
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      setSuccess(data.success);
      setMessage(data.message);
    } catch {
      setSuccess(false);
      setMessage("Could not connect to the server. Is the backend running?");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page-shell">
      <section className="brand-panel">
        <div className="brand">
          <span className="brand-mark"><Activity size={23} strokeWidth={3} /></span>
          <span>MEDCARE</span>
        </div>

        <div className="illustration" aria-hidden="true">
          <div className="halo"><HeartPulse size={76} /></div>
          <div className="doctor doctor-one"><Stethoscope size={56} /><span>✚</span></div>
          <div className="doctor doctor-two"><Activity size={48} /><span>+</span></div>
          <div className="ground"></div>
        </div>

        <div className="brand-copy">
          <p className="eyebrow">HOSPITAL SUPPORT, SIMPLIFIED</p>
          <h1>Smarter Hospital Support,<br />Better Patient Care.</h1>
          <p className="brand-description">
            One connected place for your team to resolve requests and keep the focus where it belongs — on patients.
          </p>
        </div>
        <p className="brand-footer">✦ &nbsp; Supporting your teams. Every shift, every day.</p>
      </section>

      <section className="form-panel">
        <div className="login-card">
          <p className="portal-label"><ShieldCheck size={14} /> STAFF PORTAL</p>
          <h2>Welcome Back!</h2>
          <p className="intro">Sign in to manage your hospital support requests.</p>

          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email Address</label>
            <div className="input-wrap">
              <Mail size={17} />
              <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your work email" required />
            </div>

            <label htmlFor="password">Password</label>
            <div className="input-wrap">
              <Lock size={17} />
              <input id="password" type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" required />
              <button className="visibility" type="button" onClick={() => setShowPassword(!showPassword)} aria-label="Toggle password visibility">
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>

            <div className="form-options">
              <label className="remember"><input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} /> Remember me</label>
              <button type="button" className="text-button" onClick={() => { setSuccess(false); setMessage("For this demo, use the credentials shown below."); }}>Forgot Password?</button>
            </div>

            <button className="login-button" type="submit" disabled={loading}>
              {loading ? "Signing in..." : "Login"}
            </button>
          </form>

          {message && <div className={`feedback ${success ? "good" : "bad"}`} role="status">{message}</div>}

          <div className="or-divider"><span></span><small>OR</small><span></span></div>
          <div className="secure-note"><ShieldCheck size={15} /> Secure Hospital Staff Access — Demo</div>
          <p className="help-text">Having trouble signing in? <a href="mailto:support@example.com">Contact IT Support</a></p>

          <div className="demo-credentials">
            <strong>Demo credentials</strong>
            <span>Email: admin@medcare.com</span>
            <span>Password: medcare123</span>
          </div>
        </div>
      </section>
    </main>
  );
}
