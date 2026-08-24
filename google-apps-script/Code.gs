/**
 * Xtreme Fabrix booking endpoint and confirmation-email automation.
 *
 * Run setupBookingSheet() once after adding this script to the spreadsheet's
 * Apps Script project. Deploy doPost(e) as a Web app, then set the resulting
 * /exec URL as VITE_GOOGLE_APPS_SCRIPT_BOOKING_URL in the website environment.
 */

const BOOKING_CONFIG = Object.freeze({
  // Leave blank when this Apps Script project is bound to the target spreadsheet.
  // For a standalone Apps Script project, paste the spreadsheet ID here instead.
  spreadsheetId: "",
  sheetName: "Bookings",
  businessName: "Xtreme Fabrix Solutions",
  businessEmail: "xtremefabrix@gmail.com",
  businessPhone: "+27 72 036 6449",
});

const BOOKING_HEADERS = [
  "Booking ID",
  "Created At",
  "Customer Name",
  "Email",
  "Phone",
  "Service",
  "Booking Date",
  "Start Time",
  "End Time",
  "Address",
  "Suburb/Area",
  "Notes",
  "Status",
  "Admin Notes",
  "Confirmed At",
  "Order ID",
];

/**
 * Receives the URL-encoded POST sent by src/pages/Booking.tsx.
 */
function doPost(e) {
  try {
    const booking = readBooking_(e && e.parameter);
    const validationError = validateBooking_(booking);

    if (validationError) {
      return jsonOutput_({ success: false, error: validationError });
    }

    const sheet = getBookingSheet_();
    assertBookingHeaders_(sheet);

    const bookingId = createBookingId_();
    sheet.appendRow([
      bookingId,
      new Date(),
      safeSheetValue_(booking.fullNameFabrix),
      safeSheetValue_(booking.emailFabrix),
      safeSheetValue_(booking.phoneFabrix),
      safeSheetValue_(booking.serviceTypeFabrix),
      safeSheetValue_(booking.bookingDateFabrix),
      safeSheetValue_(booking.startTimeFabrix),
      safeSheetValue_(booking.endTimeFabrix),
      safeSheetValue_(booking.addressFabrix),
      safeSheetValue_(booking.suburbFabrix),
      safeSheetValue_(booking.notesFabrix),
      "Pending",
      "",
      "",
      "",
    ]);

    return jsonOutput_({ success: true, bookingId: bookingId });
  } catch (error) {
    console.error("doPost error: " + errorToString_(error));
    return jsonOutput_({ success: false, error: "Unable to save the booking." });
  }
}

/**
 * A harmless endpoint check. Open the deployed /exec URL in a browser to verify
 * that the web app is reachable.
 */
function doGet() {
  return jsonOutput_({ success: true, message: "Booking endpoint is ready." });
}

/**
 * Install this as an installable From spreadsheet -> On edit trigger.
 * It sends exactly one confirmation email when Status (column M) becomes
 * "Confirmed".
 */
function onStatusChange(e) {
  try {
    if (!e || !e.range) {
      throw new Error("This function must be run by an on-edit trigger.");
    }

    const editedRange = e.range;
    const sheet = editedRange.getSheet();

    if (
      sheet.getName() !== BOOKING_CONFIG.sheetName ||
      editedRange.getRow() === 1 ||
      editedRange.getColumn() !== 13 ||
      editedRange.getNumRows() !== 1 ||
      editedRange.getNumColumns() !== 1 ||
      String(e.value || "").trim() !== "Confirmed"
    ) {
      return;
    }

    const row = editedRange.getRow();
    const rowRange = sheet.getRange(row, 1, 1, BOOKING_HEADERS.length);
    const rawValues = rowRange.getValues()[0];
    const displayValues = rowRange.getDisplayValues()[0];

    // Do not send another message if an admin changes away from Confirmed and
    // later changes the status back again.
    if (rawValues[14]) {
      return;
    }

    const bookingId = displayValues[0];
    const fullName = displayValues[2];
    const email = String(rawValues[3] || "").trim();
    const service = displayValues[5];
    const bookingDate = formatBookingDate_(rawValues[6], displayValues[6]);
    const startTime = displayValues[7];
    const endTime = displayValues[8];
    const address = displayValues[9];
    const suburb = displayValues[10];
    const notes = displayValues[11];

    if (!email) {
      return;
    }

    const time = startTime && endTime ? startTime + " – " + endTime : "To be confirmed";
    const location = [address, suburb].filter(Boolean).join(", ");
    const subject = "Your Xtreme Fabrix booking (" + bookingId + ") is confirmed";

    MailApp.sendEmail({
      to: email,
      subject: subject,
      body: confirmationText_({ bookingId, fullName, service, bookingDate, time, location, notes }),
      htmlBody: confirmationHtml_({ bookingId, fullName, service, bookingDate, time, location, notes }),
      name: BOOKING_CONFIG.businessName,
      replyTo: BOOKING_CONFIG.businessEmail,
    });

    // Stamp Confirmed At only after MailApp accepts the message.
    sheet.getRange(row, 15).setValue(new Date());
  } catch (error) {
    console.error("onStatusChange error: " + errorToString_(error));
  }
}

/**
 * Run once from the Apps Script editor. It creates the sheet when necessary,
 * writes the required headers, adds a Status dropdown, and creates the trigger.
 */
function setupBookingSheet() {
  const spreadsheet = getSpreadsheet_();
  let sheet = spreadsheet.getSheetByName(BOOKING_CONFIG.sheetName);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(BOOKING_CONFIG.sheetName);
  }

  assertBookingHeaders_(sheet);
  sheet.setFrozenRows(1);
  sheet.getRange(1, 1, 1, BOOKING_HEADERS.length)
    .setFontWeight("bold")
    .setBackground("#f8e71c");
  sheet.getRange("B:B").setNumberFormat("yyyy-mm-dd hh:mm:ss");
  sheet.getRange("G:G").setNumberFormat("yyyy-mm-dd");
  sheet.getRange("O:O").setNumberFormat("yyyy-mm-dd hh:mm:ss");

  const statusValidation = SpreadsheetApp.newDataValidation()
    .requireValueInList(["Pending", "Confirmed", "Cancelled"], true)
    .setAllowInvalid(false)
    .build();
  sheet.getRange(2, 13, Math.max(sheet.getMaxRows() - 1, 1), 1).setDataValidation(statusValidation);
  sheet.autoResizeColumns(1, BOOKING_HEADERS.length);

  createStatusChangeTrigger_();
}

function readBooking_(parameters) {
  return {
    fullNameFabrix: parameter_(parameters, "fullNameFabrix"),
    emailFabrix: parameter_(parameters, "emailFabrix"),
    phoneFabrix: parameter_(parameters, "phoneFabrix"),
    serviceTypeFabrix: parameter_(parameters, "serviceTypeFabrix"),
    bookingDateFabrix: parameter_(parameters, "bookingDateFabrix"),
    startTimeFabrix: parameter_(parameters, "startTimeFabrix"),
    endTimeFabrix: parameter_(parameters, "endTimeFabrix"),
    addressFabrix: parameter_(parameters, "addressFabrix"),
    suburbFabrix: parameter_(parameters, "suburbFabrix"),
    notesFabrix: parameter_(parameters, "notesFabrix"),
  };
}

function validateBooking_(booking) {
  if (booking.fullNameFabrix.length < 2 || booking.fullNameFabrix.length > 100) return "Please provide a valid name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(booking.emailFabrix)) return "Please provide a valid email address.";
  if (booking.phoneFabrix.length < 10 || booking.phoneFabrix.length > 50) return "Please provide a valid phone number.";
  if (!booking.serviceTypeFabrix || booking.serviceTypeFabrix.length > 200) return "Please select a service.";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(booking.bookingDateFabrix)) return "Please select a valid booking date.";
  if (booking.addressFabrix.length < 5 || booking.addressFabrix.length > 200) return "Please provide a valid address.";
  if (booking.suburbFabrix.length < 2 || booking.suburbFabrix.length > 100) return "Please provide a valid suburb or area.";
  if (booking.notesFabrix.length > 500) return "Notes must be 500 characters or fewer.";
  return "";
}

function getSpreadsheet_() {
  const spreadsheet = BOOKING_CONFIG.spreadsheetId
    ? SpreadsheetApp.openById(BOOKING_CONFIG.spreadsheetId)
    : SpreadsheetApp.getActiveSpreadsheet();

  if (!spreadsheet) {
    throw new Error("No spreadsheet is configured. Bind the script to the spreadsheet or set spreadsheetId.");
  }

  return spreadsheet;
}

function getBookingSheet_() {
  const sheet = getSpreadsheet_().getSheetByName(BOOKING_CONFIG.sheetName);
  if (!sheet) {
    throw new Error('Sheet "' + BOOKING_CONFIG.sheetName + '" was not found. Run setupBookingSheet first.');
  }
  return sheet;
}

function assertBookingHeaders_(sheet) {
  const range = sheet.getRange(1, 1, 1, BOOKING_HEADERS.length);
  const currentHeaders = range.getDisplayValues()[0];
  const isBlank = currentHeaders.every(function (header) { return !header; });

  if (isBlank) {
    range.setValues([BOOKING_HEADERS]);
    return;
  }

  const matches = BOOKING_HEADERS.every(function (header, index) {
    return currentHeaders[index] === header;
  });

  if (!matches) {
    throw new Error("The header row does not match booking-sheet-template.csv.");
  }
}

function createStatusChangeTrigger_() {
  const spreadsheet = getSpreadsheet_();
  ScriptApp.getProjectTriggers()
    .filter(function (trigger) { return trigger.getHandlerFunction() === "onStatusChange"; })
    .forEach(function (trigger) { ScriptApp.deleteTrigger(trigger); });

  ScriptApp.newTrigger("onStatusChange")
    .forSpreadsheet(spreadsheet)
    .onEdit()
    .create();
}

function createBookingId_() {
  const datePart = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyyMMdd");
  const uniquePart = Utilities.getUuid().slice(0, 8).toUpperCase();
  return "XF-" + datePart + "-" + uniquePart;
}

function formatBookingDate_(rawValue, displayValue) {
  if (rawValue instanceof Date && !isNaN(rawValue.getTime())) {
    return Utilities.formatDate(rawValue, Session.getScriptTimeZone(), "EEEE, d MMMM yyyy");
  }

  const match = String(rawValue || "").match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (match) {
    const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
    return Utilities.formatDate(date, Session.getScriptTimeZone(), "EEEE, d MMMM yyyy");
  }

  return displayValue || "To be confirmed";
}

function confirmationText_(details) {
  return [
    "Your Booking Is Confirmed",
    "",
    "Hi " + details.fullName + ",",
    "",
    "Great news — your booking has been reviewed and confirmed.",
    "",
    "Booking ID: " + details.bookingId,
    "Service: " + details.service,
    "Date: " + details.bookingDate,
    "Time: " + details.time,
    "Address: " + (details.location || "To be confirmed"),
    "Notes: " + (details.notes || "None provided"),
    "",
    "If any details look incorrect, reply to this email or contact us directly.",
    "",
    "Kind regards,",
    "The Xtreme Fabrix Team",
  ].join("\n");
}

function confirmationHtml_(details) {
  const addressLine = details.location
    ? '<p style="margin:8px 0; color:#ffffff;"><strong>Address:</strong> ' + escapeHtml_(details.location) + "</p>"
    : "";

  return `
    <div style="margin:0; padding:32px 16px; background:#0a0a0a; font-family:Arial, sans-serif; color:#ffffff;">
      <div style="max-width:600px; margin:0 auto; background:#1c1c1c; border:1px solid #333333;">
        <div style="padding:24px; text-align:center; background:#000000;">
          <h1 style="margin:0; color:#f8e71c; font-size:26px;">${escapeHtml_(BOOKING_CONFIG.businessName)}</h1>
          <p style="margin:8px 0 0; color:#bbbbbb; font-size:13px;">Premium Cleaning &amp; Fabric Care</p>
        </div>
        <div style="padding:32px 24px;">
          <h2 style="margin-top:0; color:#f8e71c;">Your Booking Is Confirmed</h2>
          <p style="color:#dddddd;">Hi ${escapeHtml_(details.fullName)},</p>
          <p style="color:#dddddd; line-height:1.6;">Great news — your booking has been reviewed and confirmed. Here are your details:</p>
          <div style="margin:24px 0; padding:20px; background:#292929; border-left:4px solid #f8e71c;">
            <p style="margin:8px 0; color:#ffffff;"><strong>Booking ID:</strong> ${escapeHtml_(details.bookingId)}</p>
            <p style="margin:8px 0; color:#ffffff;"><strong>Service:</strong> ${escapeHtml_(details.service)}</p>
            <p style="margin:8px 0; color:#ffffff;"><strong>Date:</strong> ${escapeHtml_(details.bookingDate)}</p>
            <p style="margin:8px 0; color:#ffffff;"><strong>Time:</strong> ${escapeHtml_(details.time)}</p>
            ${addressLine}
            <p style="margin:8px 0; color:#ffffff;"><strong>Notes:</strong> ${escapeHtmlWithBreaks_(details.notes || "None provided")}</p>
          </div>
          <p style="color:#dddddd; line-height:1.6;">If any details look incorrect, please reply to this email or contact us directly.</p>
          <p style="margin-top:28px; color:#dddddd;">Kind regards,<br><strong style="color:#f8e71c;">The Xtreme Fabrix Team</strong></p>
        </div>
        <div style="padding:18px 24px; text-align:center; background:#000000; color:#999999; font-size:12px;">
          Cape Town, South Africa<br>${escapeHtml_(BOOKING_CONFIG.businessPhone)} · ${escapeHtml_(BOOKING_CONFIG.businessEmail)}
        </div>
      </div>
    </div>
  `;
}

function parameter_(parameters, name) {
  return String((parameters && parameters[name]) || "").trim();
}

function safeSheetValue_(value) {
  const text = String(value || "");
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function escapeHtml_(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function escapeHtmlWithBreaks_(value) {
  return escapeHtml_(value).replace(/\r?\n/g, "<br>");
}

function jsonOutput_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

function errorToString_(error) {
  return error && error.stack ? error.stack : String(error);
}
