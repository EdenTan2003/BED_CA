/*
    Class: DIT/FT/1B/10
    Admission Number: P2243605
    Name: Tan Yong Kit, Eden
*/

function redirectIf(condition, url) {
  if (condition) {
    window.location.href = url;
  }
}

function showAlertSuccess(msg = "") {
  return `
        <div class="alert alert-success alert-dismissible fade show" role="alert">
            <strong>Success</strong> ${msg}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
}

function showAlertWarning(msg = "") {
  return `
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>Warning</strong> ${msg}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
}

function showAlertDanger(msg = "") {
  return `
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
            <strong>Error</strong> ${msg}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
}
