import {motion} from 'framer-motion';

const FadeInAnimation = ({children,custom}) => {
    const fadeInAnimation = {
        initial:{
            opacity:0,
            y:100,
        },
        animate:(index)=>({
            opacity:1,
            y:0,
            transition:{
                delay: 0.07 * index,
                duration: 0.5,
            },
        }),
    }
    return (
        <motion.div variants={fadeInAnimation} initial="initial" whileInView="animate" viewport={{once:true}} custom={custom}>
            {children}
        </motion.div>
    );
};

export default FadeInAnimation;