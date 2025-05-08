interface Window {
  calendar?: {
    schedulingButton: {
      load: (options: {
        url: string
        color: string
        label: string
        target: HTMLElement
      }) => void
    }
  }
}
