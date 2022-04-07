
# Trinitas Overlay System

This repo is a custom live coverage overlay for RL Esport broadcasts using the Bakkes Plugin [SOS Overlay](https://gitlab.com/bakkesplugins/sos)

## Run Locally

#### Clone the project

```bash
  git clone https://github.com/IsaaacQINH/trinitas-overlay-system
```

#### Go to the project directory

```bash
  cd trinitas-overlay-system
```

#### Install dependencies

```bash
  npm install
```

#### Set Environment variables

Create a file `.env` in projet root directory.
All required Environment variables are in `.env.example`.
Contact [@isaaacqinh](https://www.github.com/isaaacqinh) (Discord: isaâac#0001)
to get production `.env`

Start the server

```bash
  npm start
```

#### Open Overlay in Browser

Now you should reach the overlay at http://localhost:3000

#### Control Overlay with spreadsheet

You can configure the overlay with following spreadsheet
[Trinitas Esport - Overlay Configuration Datasheet](https://docs.google.com/spreadsheets/d/1VgPhZ4L-0XMchWVfIO8MGahwGlJ04QgBof5XE3boqAQ/edit#gid=0)

Note: If not authorized, contact [@isaaacqinh](https://www.github.com/isaaacqinh) (Discord: isaâac#0001)


## Reference

#### YrkOverlay

| Function | Parameter     | Description                |
| :-------- | :------- | :------------------------- |
| `displayScore` | `int, int` | Displays score to HTML elements with `.score#<blue\|orange>` |
| `displayClock` | `int, int, boolean` | Displays clock to HTML element with .clock.time#clock` |
| `displayPlayer` | `player` | Displays player data of current target to HTML element with `.target#<data>` |
| `displayAdditionalPlayerinfo` | `player` | Displays boost and speed to HTML element with `.additionalhud .target#<data>` |
| `diplayBoost` | `int, int` | Displays boost and speed to HTML element with `.target#<boost\|speed>` |

## Authors

- [York | @isaaacqinh](https://www.github.com/isaaacqinh)


