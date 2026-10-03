# KIOSK

A first-person, slow-burn 3D horror cooking game set on June 21, 1986. Serve five customers on each of five increasingly unsettling night shifts while investigating the disappearance of the kiosk's previous employee.

## Run

### Windows
Double-click **`start.bat`**.

### macOS / Linux
```bash
npm install
npm run dev
```
Open the local URL printed in the terminal. The first click enables mouse look and audio.

## Controls

| Control | Action |
|---|---|
| `W A S D` | Move |
| Mouse | Look |
| Hold `RMB` | Pick up / drag ingredients and crates |
| Release `RMB` | Drop onto a station, tray, or unpacking mat |
| `LMB` | Use doors, buttons, terminal, bell, bed, notes |
| Mouse wheel | Move held object closer / farther |
| `B` | Recipe book |
| `Shift` | Walk faster |
| `Ctrl` / `C` | Crouch |
| `Esc` | Pause |

There is deliberately no inventory or equip key: food preparation happens by physically dragging ingredients through the kiosk. Customers have no patience meter and wait indefinitely.

## Cooking loop

- Meat and sausages start in the walk-in freezer and cook on the grill.
- Frozen fries cook in the fryer.
- Pizza ingredients are combined on the central PREP board, then baked in the furnace.
- Drinks and cheese are in the glass fridge.
- Finished order components go on the serving tray. Ring the brass bell to submit.
- Request restocks from the rear delivery terminal. Open the back door and drag the delivered crate onto the red mat.

Progress is saved locally after every served customer. Customer speech uses the browser's installed text-to-speech voices and can be disabled in Settings.
