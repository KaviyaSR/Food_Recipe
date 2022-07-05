// Default state
export const DEFAULT_STATE = { isFetching: true, isError: false, response: {} };
export const DEFAULT_STATE_FF_EF = {
  isFetching: false,
  isError: false,
  response: {},
};
export const DEFAULT_STATE_FF_ET = {
  isFetching: false,
  isError: true,
  response: {},
};

// 

export const videoParts = {
  1: 'Single',
  2: 'Multiple',
};

// codecs
export const codecs = [
  { label: 'H264', value: 'H264' },
  { label: 'H265', value: 'H265' },
  { label: 'VP8', value: 'VP8' },
  { label: 'VP9', value: 'VP9' },
  { label: 'AV1', value: 'AV1' },
  { label: 'AAC', value: 'AAC' },
];

// codecs
export const storageTypes = [
  { label: 'S3', value: 'S3' },
  { label: 'AZURE', value: 'AZURE' },
  { label: 'GCS', value: 'GCS' },
  { label: 'FTP', value: 'FTP' },
  { label: 'SFTP', value: 'SFTP' },
];

// codecs
export const jobStatus = [
  { label: 'CREATED', value: 'CREATED' },
  { label: 'STARTED', value: 'STARTED' },
  { label: 'RUNNING', value: 'RUNNING' },
  { label: 'FAILED', value: 'FAILED' },
  { label: 'COMPLETED', value: 'COMPLETED' },
];

export const rolePermissions = [];

export const rolesList = [
  { label: 'Admin', value: 'admin' },
  { label: 'Super Admin', value: 'superadmin' },
  { label: 'Customer Admin', value: 'customeradmin' },
];

// formats
export const formats = [
  { label: 'MP4', value: 'MP4' },
  { label: 'HLS', value: 'HLS' },
  { label: 'MPEG_DASH', value: 'MPEG_DASH' },
  { label: 'WebM', value: 'WebM' },
  { label: 'Mp3', value: 'Mp3' },
];

// video encode formats and its codec
export const encodeFormats = [
  { format: 'MP4', codec: ['H264', 'H265', 'AV1'] },
  { format: 'HLS', codec: ['H264', 'H265'] },
  { format: 'MPEG-DASH', codec: ['H264', 'H265', 'VP8', 'VP9'] },
  { format: 'WebM', codec: ['VP8', 'VP9'] },
  { format: 'Mp3', codec: ['AAC'] },
];

export const outputResolutions = [
  {
    label: '4k (3840 x 2160)',
    value: '4k',
    width: '3840',
    height: '2160',
    bitRate: '6500',
    audioBitRate: '256',
  },
  {
    label: '1440p (2560 x 1440)',
    value: '1440p',
    width: '2560',
    height: '1440',
    bitRate: '5700',
    audioBitRate: '256',
  },
  {
    label: '1080p (1920 x 1080)',
    value: '1080p',
    width: '1920',
    height: '1080',
    bitRate: '4800',
    audioBitRate: '192',
  },
  {
    label: '720p (1280 x 720)',
    value: '720p',
    width: '1280',
    height: '720',
    bitRate: '3800',
    audioBitRate: '128',
  },
  {
    label: '540p (960 x 540)',
    value: '540p',
    width: '960',
    height: '540',
    bitRate: '3000',
    audioBitRate: '128',
  },
  {
    label: '480p (854 x 480)',
    value: '480p',
    width: '854',
    height: '480',
    bitRate: '2400',
    audioBitRate: '128',
  },
  {
    label: '360p (640 x 360)',
    value: '360p',
    width: '640',
    height: '360',
    bitRate: '1800',
    audioBitRate: '96',
  },
  {
    label: '240p (426 x 240)',
    value: '240p',
    width: '426',
    height: '240',
    bitRate: '1200',
    audioBitRate: '64',
  },
  {
    label: '144p (256 x 144)',
    value: '144p',
    width: '256',
    height: '144',
    bitRate: '300',
    audioBitRate: '32',
  },
  {
    label: 'Custom Resolution',
    value: 'Custom Resolution',
    width: '1280',
    height: '720',
    bitRate: '3800',
    audioBitRate: '128',
  },
];

export const bgColors = {
  1: 'bg-lred',
  COMPLETED: 'bg-grn',
  STARTED: 'bg-grey',
  // CREATED: "bg-dred",
  // CREATED: "bg-blu",
  CREATED: 'bg-yellow',
  8: 'bg-lgrn',
  // CREATED: "bg-lgrey"
  // CREATED: "bg-sail",
};
