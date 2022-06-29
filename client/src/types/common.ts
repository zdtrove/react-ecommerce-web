import type { Color } from '@material-ui/lab/Alert';

export type decodedType = {
  role: string;
};

export type UiState = {
  snackbar: {
    isShow: boolean;
    message: string | null;
    status: Color;
  };
  backdrop: boolean;
};
