import { FaReact } from 'react-icons/fa'

export const Footer = () => {
    return (
        <footer className="footer text-center p-4 bg-base-300 text-base-content text-white z-[100] mt-16 md:m-0 relative flex justify-center">
            <div>
                <p className='flex justify-center items-center md:text-xl md:flex-row'>
                    Web desarrollada por:
                    <span className='animate-spin-slow'><FaReact className='mx-2 scale-110 text-cyan-400' /></span>
                    <a 
                        href="https://taplink.cc/sebmm3010" 
                        target="_blank" rel="noopener noreferrer" 
                        className='cursor-pointer hover:underline hover:text-[#E50608]'
                    >
                        Sebastian Madero
                    </a>
                </p>
            </div>
        </footer>
    )
}
