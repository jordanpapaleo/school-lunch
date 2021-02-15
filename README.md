# School Lunch

This is a tutorial project from Fullstack.io.
## Notes

### Initialize a new Full Stack project

```bash
mkdir -p project/frontend project/backend &&
cd project &&
npx degit sveltejs/template frontend &&
(cd frontend && yarn) &&
(cd backend && npx express-generator --no-view && yarn) &&
cd ..
```

### DB

```bash
# create a migration
knex migrate:make lunch_week_table
```

https://thecodebarbarian.com/80-20-guide-to-express-error-handling


```sql
select * from lunch_week
```

```sql
insert into lunch_week
	(week_of, is_published)
values
  ('2020-10-05', true),
  ('2020-10-12', true),
  ('2020-10-19', false),
  ('2020-10-26', false),
  ('2020-11-02', false)
```

```sql
select * from lunch_week
```
