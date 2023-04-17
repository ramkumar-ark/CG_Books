
const SubHeader = ({topOffset=0, children, componentref}) => (
    <div style={{
        borderBottom:"ridge", position:"sticky", top:topOffset, zIndex:999, backgroundColor:"whitesmoke",
        display:'flex', justifyContent:'space-between', padding:"0px 7px 0px 10px", flexWrap:"nowrap",
        alignItems:'center',
    }} ref={componentref}>
        {children}
    </div>
);

export default SubHeader;
