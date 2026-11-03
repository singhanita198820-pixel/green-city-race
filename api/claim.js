<!-- ADMIN ONLY API KEY - Hidden for normal users -->
<div id="adminPanel" style="display:none;margin:12px auto;max-width:340px;background:linear-gradient(135deg,#0f1f0f,#1a2f1a);border:1px solid #00FF41;border-radius:14px;padding:14px;box-shadow:0 0 20px rgba(0,255,65,0.2);">
  <div style="display:flex;justify-content:space-between;align-items:center;">
    <label style="color:#00FF41;font-size:11px;letter-spacing:1px;font-weight:bold;">🔐 ADMIN PANEL - TURBO26</label>
    <span style="background:#00FF41;color:#000;font-size:9px;padding:2px 6px;border-radius:4px;font-weight:bold;">ADMIN MODE</span>
  </div>
  
  <div style="margin-top:10px;">
    <label style="color:#aaa;font-size:10px;">API KEY (CLAIM_SECRET)</label>
    <div style="display:flex;gap:8px;margin-top:4px;">
      <input id="apiKeyInput" type="password" placeholder="Paste CLAIM_SECRET" 
        style="flex:1;background:#000;color:#00FF41;border:1px solid #333;border-radius:8px;padding:10px;font-size:12px;outline:none;"
      >
      <button onclick="toggleKey()" style="background:#333;color:#fff;border:none;border-radius:8px;padding:10px;cursor:pointer;">👁️</button>
      <button onclick="saveApiKey()" style="background:#00FF41;color:#000;border:none;border-radius:8px;padding:10px 14px;font-weight:bold;cursor:pointer;">SAVE</button>
    </div>
  </div>

  <div style="margin-top:10px;">
    <label style="color:#aaa;font-size:10px;">AIRDROP WALLET STATUS</label>
    <div id="adminStats" style="background:#000;border-radius:8px;padding:8px;margin-top:4px;font-size:11px;color:#888;">
      Checking...
    </div>
  </div>

  <div id="apiStatus" style="font-size:10px;color:#00FF41;margin-top:8px;">✅ Admin mode active</div>
</div>
