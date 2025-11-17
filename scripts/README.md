# Device Data Updater

This script automatically updates device data from GSMArena for various brands.

## Setup

1. Install dependencies:
   ```bash
   cd scripts
   npm install
   ```

2. Run the updater:
   ```bash
   npm run update
   ```

## Scheduling Monthly Updates (macOS/Linux)

To run this script automatically every month, you can add it to your crontab:

1. Make the script executable:
   ```bash
   chmod +x update-devices.sh
   ```

2. Open your crontab:
   ```bash
   crontab -e
   ```

3. Add the following line to run the script on the 1st day of every month at 3 AM:
   ```
   0 3 1 * * cd /path/to/sass-getId/scripts && ./update-devices.sh
   ```

## Notes

- The script will update device data for all brands defined in `BRAND_MAPPINGS`.
- Existing devices are preserved, and only new devices are added.
- The script includes rate limiting to be respectful to GSMArena's servers.
