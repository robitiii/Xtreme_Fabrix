# Google Apps Script booking setup

1. Open the target Google Sheet, then choose **Extensions → Apps Script**.
2. Replace the default editor contents with [`Code.gs`](./Code.gs).
3. Set `BOOKING_CONFIG.sheetName` to the name of the sheet tab that will store bookings. It defaults to `Bookings`.
   - If the Apps Script project is not created from the Google Sheet, also set `BOOKING_CONFIG.spreadsheetId`.
4. In the Apps Script editor, run `setupBookingSheet` once and grant the requested permissions. It creates or verifies the header row, adds the Status dropdown, and creates the email trigger.
5. Deploy the project as a **Web app**:
   - **Execute as:** Me
   - **Who has access:** Anyone
   - Copy the deployment URL ending in `/exec`.
6. Put that URL in the website's `.env` file:

   ```env
   VITE_GOOGLE_APPS_SCRIPT_BOOKING_URL=https://script.google.com/macros/s/DEPLOYMENT_ID/exec
   ```

7. Restart the Vite dev server for local testing, or rebuild and deploy the website.

## What it does

- `doPost(e)` accepts the current form field names: `fullNameFabrix`, `emailFabrix`, `phoneFabrix`, `serviceTypeFabrix`, `bookingDateFabrix`, `addressFabrix`, `suburbFabrix`, and `notesFabrix`.
- It inserts a row in the same 16-column order as `booking-sheet-template.csv`, generating a Booking ID, Created At timestamp, and `Pending` status.
- `onStatusChange(e)` sends one confirmation email after an admin changes Status to `Confirmed`, then sets Confirmed At.

The current website does not collect Start Time or End Time, so those two columns are intentionally blank until an admin schedules the booking.
