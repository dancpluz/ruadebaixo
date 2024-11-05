

export default function Produto({ params: slug }) {
  return (
    <main className='flex flex-col flex-1'>
      {slug.slug}
    </main>
  )
}
