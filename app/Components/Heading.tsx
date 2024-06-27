interface HeadingProps{
    title: string,
    counter?: boolean
}
const Heading: React.FC<HeadingProps> = ({title , counter}) => {
  return (
    <div className="center? 'text-center : text-start">
        <h1 className="font-bold text-2x1">{title}</h1>
    </div>
  )
}

export default Heading