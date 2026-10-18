# MiniOS Monitor - Project Execution Plan

## Overview
I Built a professional OS monitoring dashboard in phases. Complete one module at a time with testing before moving forward.

---

## Phase 1: Project Setup & Foundation (Day 1)✅

### Step 1.1: Initialize Project Structure
- Create project folder: `mini-os-monitor`
- Setup two folders: `server/` and `client/`
- Initialize Node.js: `npm init`
- Install core dependencies: `express`, `systeminformation`, `cors`

### Step 1.2: Verify Dependencies Work
- Create basic `server.js` with Express
- Test that all packages import without errors
- Confirm no missing modules

### Step 1.3: Setup Basic Server
- Create Express server listening on port 3000
- Add CORS middleware (frontend will call backend)
- Create `/` route that returns `{status: "Server running"}`
- Test server: `npm start` → open browser on `http://localhost:3000`

**Why this matters:** Foundation is solid before building features. No surprises later.

---

## Phase 2: Backend APIs (Day 2-3)✅

### Module 1: CPU Monitor✅
**Step 2.1:** Create `services/cpuService.js`
- Use `systeminformation` package
- Write function to fetch: CPU model, cores, speed, current usage %
- Return as JavaScript object

**Step 2.2:** Create `routes/cpu.js`
- Create GET `/cpu` endpoint
- Call cpuService function
- Return JSON response
- Test with Postman/browser

---

### Module 2: Memory Monitor✅
**Step 2.3:** Create `services/memoryService.js`
- Write function to fetch: total RAM, used RAM, free RAM, usage %
- Return as JavaScript object

**Step 2.4:** Create `routes/memory.js`
- Create GET `/memory` endpoint
- Call memoryService function
- Return JSON response
- Test API

---

### Module 3: Process Monitor✅
**Step 2.5:** Create `services/processService.js`
- Write function to fetch all running processes
- For each process: extract PID, name, CPU %, memory %
- Return as array of objects

**Step 2.6:** Create `routes/process.js`
- Create GET `/processes` endpoint
- Call processService function
- Return JSON array
- Test API

**Step 2.7:** Create POST `/process/kill/:pid` endpoint
- Accept PID from request
- Kill the process using `ps-node` or system command
- Return success/error message
- Handle errors gracefully

**Checkpoint:** All 3 APIs working? Open Postman, test all endpoints. Move to Phase 3 only when all pass.

---


# I built frontend using angular 

## Phase 3: Frontend Integration (Day 4)

### Step 3.1: Create Basic HTML Structure
- Create `client/index.html`
- Divide page into 3 sections: CPU Monitor, Memory Monitor, Process Monitor
- Add HTML elements (divs, tables, inputs) for each section
- NO styling yet, just structure

### Step 3.2: Create Basic CSS
- Create `client/style.css`
- Style the 3 sections (margins, borders, padding)
- Make it readable (no fancy design needed yet)
- Use dark theme (looks professional)

### Step 3.3: Create JavaScript App
- Create `client/app.js`
- Write function `fetchCPU()` → call GET `/cpu` → update DOM
- Write function `fetchMemory()` → call GET `/memory` → update DOM
- Write function `fetchProcesses()` → call GET `/processes` → build table in DOM
- Write function `searchProcess(name)` → filter process list
- Write function `killProcess(pid)` → call POST `/process/kill/:pid`

### Step 3.4: Add Auto-Refresh
- Use `setInterval()` to call `fetchCPU()` every 2 seconds
- Use `setInterval()` to call `fetchMemory()` every 2 seconds
- Do NOT refresh process list automatically (too heavy)
- Add manual refresh button for process list

### Step 3.5: Connect Frontend to Backend
- Serve static files from `client/` folder in Express
- Set `app.use(express.static('client'))`
- Test: `http://localhost:3000` loads HTML page
- Test: API calls work from browser console

---

## Phase 4: Features & Polish (Day 5)

### Step 4.1: Implement Process Search
- Add search input field in HTML
- Write filter logic in `app.js`
- Search by process name (case-insensitive)
- Show filtered results in real-time

### Step 4.2: Implement Process Sorting
- Add sort buttons (by CPU, by Memory)
- Write sorting logic
- Update table on sort click

### Step 4.3: Add Kill Process Feature
- Add delete/kill button per process row
- Show confirmation dialog before killing
- Show success/error message
- Refresh process list after kill

### Step 4.4: Error Handling
- Handle API errors gracefully (server down, permission denied)
- Show user-friendly error messages
- Log errors to console for debugging

**Checkpoint:** All features working? Test manually (click, search, sort, kill, refresh).

---

## Phase 5: Testing & Deployment (Day 6)

### Step 5.1: Manual Testing Checklist
- ✅ CPU updates every 2 seconds
- ✅ Memory updates every 2 seconds
- ✅ Process list loads
- ✅ Search works
- ✅ Sort works
- ✅ Kill works
- ✅ No console errors
- ✅ Responsive on different screen sizes

### Step 5.2: Code Quality
- Remove console.log statements (or keep them for debugging)
- Add comments in critical functions
- Check for unused variables
- Ensure consistent naming (camelCase for JS)

### Step 5.3: Final Build & Documentation
- Create comprehensive `README.md`:
  - How to install
  - How to run (`npm start`)
  - Features list
  - Tech stack
  - Screenshots (optional but impressive)
- Test one final time: `npm start` → everything works

### Step 5.4: Push to GitHub
- Initialize Git: `git init`
- Create `.gitignore` (node_modules, .env)
- Commit all code
- Push to GitHub
- Add to portfolio

---

## Time Breakdown

| Phase | Days | Focus |
|-------|------|-------|
| Phase 1 | 1 | Setup |
| Phase 2 | 2 | Backend APIs |
| Phase 3 | 1 | Frontend + Connect |
| Phase 4 | 1 | Features |
| Phase 5 | 1 | Polish + Deploy |
| **Total** | **6 days** | **Complete Project** |

---

## Key Checkpoints (Do NOT Skip)

1. **After Phase 1:** Server starts without errors
2. **After Phase 2:** All 3 APIs tested with Postman
3. **After Phase 3:** Frontend loads, APIs connect
4. **After Phase 4:** All features working
5. **After Phase 5:** Ready for portfolio + GitHub

---

## Interview Tips

When asked about this project, say:
- "Built a real-time OS monitoring dashboard with Node.js backend"
- "Integrated system APIs to fetch live CPU, memory, process data"
- "Implemented process search, sort, and kill features"
- "Deployed on [platform] and available on GitHub"

---

## Success Criteria

✅ All features working  
✅ Code is clean and commented  
✅ Project on GitHub with professional README  
✅ Can explain every line of code in interview  
✅ Runs with single command: `npm start`

---

**Start Phase 1 now. Complete one phase per day. You'll finish in a week with a portfolio-ready project.**