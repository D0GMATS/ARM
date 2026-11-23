import express from 'express';
import { db } from './database/db.js';

const app = express();
app.use(express.json({ limit: '10mb' }));

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', version: '2.0.0' });
});

app.get('/api/projects', (_req, res) => {
  const rows = db.prepare('SELECT data FROM projects ORDER BY updated_at DESC').all() as {
    data: string;
  }[];
  res.json(rows.map((r) => JSON.parse(r.data)));
});

app.get('/api/projects/:id', (req, res) => {
  const row = db.prepare('SELECT data FROM projects WHERE id = ?').get(req.params.id) as
    | { data: string }
    | undefined;
  if (!row) {
    res.status(404).json({ error: 'Project not found' });
    return;
  }
  res.json(JSON.parse(row.data));
});

app.put('/api/projects/:id', (req, res) => {
  const project = req.body;
  const now = new Date().toISOString();
  db.prepare(
    `INSERT INTO projects (id, name, description, data, updated_at)
     VALUES (?, ?, ?, ?, ?)
     ON CONFLICT(id) DO UPDATE SET
       name = excluded.name,
       description = excluded.description,
       data = excluded.data,
       updated_at = excluded.updated_at`
  ).run(
    req.params.id,
    project.name ?? 'Untitled',
    project.description ?? '',
    JSON.stringify(project),
    now
  );
  res.json({ status: 'saved' });
});

app.delete('/api/projects/:id', (req, res) => {
  db.prepare('DELETE FROM projects WHERE id = ?').run(req.params.id);
  res.json({ status: 'deleted' });
});

const PORT = Number(process.env.PORT ?? 3001);
app.listen(PORT, '0.0.0.0', () => {
  console.log(`WebCAD 2.0 API server listening on http://0.0.0.0:${PORT}`);
});
