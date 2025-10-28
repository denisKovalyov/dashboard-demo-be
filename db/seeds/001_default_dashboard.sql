INSERT INTO dashboards (name)
SELECT 'Default Dashboard'
WHERE NOT EXISTS (SELECT 1 FROM dashboards);
