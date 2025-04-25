export default function MediaLayout({
    children,
    modal
  }: {
    children: React.ReactNode
    modal: React.ReactNode
  }) {
    return (
      <div className="pt-24">
        {children}
        {modal}
      </div>
    )
  }