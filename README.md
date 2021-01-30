```bash
mkdir -p project/frontend project/backend &&
cd project &&
npx degit sveltejs/template frontend &&
(cd frontend && yarn) &&
(cd backend && npx express-generator --no-view && yarn) &&
cd ..
```
