# Gator

The feed aggregator written in TypeScript. A boot.dev project.

## Configuration

The application uses a JSON configuration file. Application looks for the file at `~/.gatorconfig.json`. Config file 
contains two variables:

| Variable            | Description               | Required |
|---------------------|---------------------------|----------|
| `db_url`            | The database URL.         | Yes      |
| `current_user_name` | Currently logged-in user. | No       |

## Installation

Make sure you have Node.js and NPM installed. Then run:

```bash
# install dependencies
npm install
# if database not already set up, run migrations
npm run migrate
```

## Usage

The application is run using the `npm run start` command. It is interfaced using various commands. Structure of the 
commands is as follows: `gator command [options]`.

Available commands:

- `register` - register a new user, required parameters: `username`
- `login` - login as a user, required parameters: `username`
- `users` - list all users
- `reset` - reset the database
- `addfeed` - add a feed, required parameters: `url` and `name`
- `feeds` - list all feeds`
- `follow` - follow a feed, required parameters: `feed_url`
- `unfollow` - unfollow a feed, required parameters: `feed_url`
- `following` - list all feeds followed by the current user
- `agg` - periodically fetch feeds and store them in the database, required parameters: `interval` (format: `10s`, `1m`, `1h`)
- `browse` - display the latest x items from all feeds, optional parameters: `count` (default: `5`)
