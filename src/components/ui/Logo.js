import Image from "next/image"

const Logo = ({ style }) => {
    return (
        <Image 
            src={'/Logo.jpeg'} 
            alt="Pro GYM" 
            className={`object-cover overflow-hidden rounded-full ${style}`}
            width={60} 
            height={60}
        />
    )
}

export default Logo