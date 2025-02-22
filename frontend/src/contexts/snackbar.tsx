import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined'
import { Alert, AlertTitle, Paper, Snackbar } from '@mui/material'
import { AlertColor } from '@mui/material'

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'

type vertical = 'top' | 'bottom'

type Horizontal = 'left' | 'right'

type SnackBarData = {
  message: string
  title?: string
  snackBarProps: {
    verity: AlertColor
    vertical: vertical
    horizontal: Horizontal
  }
}

export const defaultSnackBarData: SnackBarData = {
  message: '',
  title: '',
  snackBarProps: {
    verity: 'error',
    vertical: 'top',
    horizontal: 'right'
  }
}

type SnackbarContextValue = {
  snackBarData: SnackBarData
  setSnackBarData: Dispatch<SetStateAction<SnackBarData>>
}

export const SnackBarContext = createContext({} as SnackbarContextValue)

export const useSnackBar = (): SnackbarContextValue =>
  useContext(SnackBarContext)

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false)
  const [snackBarData, setSnackBarData] =
    useState<SnackBarData>(defaultSnackBarData)

  const {
    message,
    title,
    snackBarProps: { verity, vertical, horizontal }
  } = snackBarData

  const snackbarContextValue = useMemo(
    () => ({ snackBarData, setSnackBarData }),
    [snackBarData]
  )

  useEffect(() => {
    if (snackBarData.message) {
      setOpen(true)
    }
  }, [snackBarData])

  return (
    <SnackBarContext.Provider value={snackbarContextValue}>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        anchorOrigin={{ vertical, horizontal }}
        onClose={() => setOpen(false)}
      >
        <Paper elevation={3}>
          <Alert
            severity={verity}
            sx={{
              width: '100%',
              maxWidth: '450px',
              '&.MuiAlert-root': {
                '& .MuiAlert-message': {
                  padding: '5px 0px'
                }
              }
            }}
            slots={{ closeIcon: HighlightOffOutlinedIcon }}
            slotProps={{ closeIcon: { color: verity } }}
            onClose={() => setOpen(false)}
          >
            <AlertTitle>{title}</AlertTitle>
            {message}
          </Alert>
        </Paper>
      </Snackbar>
      {children}
    </SnackBarContext.Provider>
  )
}
