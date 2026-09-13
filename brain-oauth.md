# Brain — Google Drive Integration

Brain is a private, single-user personal data warehouse operated by Luca Azalim. Its Google Drive integration archives uploaded financial statement files and stores encrypted-in-transit database backup files in a dedicated `Brain` folder in the operator’s own Google Drive.

## Privacy Policy

_Last updated: September 13, 2026_

### Google data accessed

Brain requests only the `https://www.googleapis.com/auth/drive.file` scope. This permits Brain to create, read, update, and delete only the Google Drive files and folders that Brain itself creates or that the user explicitly opens with Brain. It does not give Brain general access to other files in the user’s Drive.

### How data is used and stored

Brain uses this access solely to:

- archive statement files uploaded by the operator;
- create and verify backups of Brain’s SQLite databases; and
- restore those backups when explicitly requested by the operator.

The files remain in the operator’s Google Drive account. Brain does not sell, share, transfer, or use Google user data for advertising, analytics, or any unrelated purpose. No third party receives Google user data through this integration.

### Retention and deletion

Files are retained in the operator’s Drive according to Brain’s backup-retention rules or until the operator deletes them. The operator may delete the `Brain` folder at any time and may revoke Brain’s access from the Google Account permissions page.

### Security

OAuth credentials are stored as deployment secrets and are not committed to source control. Access is limited to the single operator and the minimum Drive scope described above.

### Contact

Questions about this integration may be sent to [lucaazalim@gmail.com](mailto:lucaazalim@gmail.com).

## Terms of Service

Brain is personal software provided solely for its owner’s private use. It is provided as-is, without warranties. The operator is responsible for the source data uploaded to Brain, the security of the connected Google account, and compliance with applicable law. Use of the Google Drive integration must remain limited to the backup, archive, and restore purposes described above.
