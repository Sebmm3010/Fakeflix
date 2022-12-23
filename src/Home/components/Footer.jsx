import { FaReact } from "react-icons/fa";
import { useHomeComponents } from '../hooks/useHomeComponents'

export const Footer = () => {
    const { location }= useHomeComponents();
    return (
        <footer className={location.pathname === '/user' ? 'absolute w-full footer text-center p-4 bg-base-300 text-base-content text-white bottom-0'
            : "w-full footer text-center p-4 bg-base-300 text-base-content text-white bottom-0"
        }>
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
