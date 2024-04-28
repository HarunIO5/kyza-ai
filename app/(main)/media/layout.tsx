export default function MediaLayout({
    children,
    modal
  }: {
    children: React.ReactNode
    modal: React.ReactNode
  }) {
    return (
      <>
        {children}
        {modal}
      </>
    )
  }