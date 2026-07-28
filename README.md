# WIDAY - "What I Did Today"

***A simple personal journal to keep track of your daily activities and notes.***

## How to

### Backup MongoDB database

```ini
sudo docker exec [container_id] mongodump --archive > ~/[dest_dir]/[filename].dump --username [root_username] --password [rootpassword] --authenticationDatabase admin
```
