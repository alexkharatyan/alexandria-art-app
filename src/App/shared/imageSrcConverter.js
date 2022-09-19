export const imageSrcConverter = (props) => {
    const {file} = props;
    const path = file.name.trim().toLowerCase() + '.png';
    console.log(path);
    return path;
};
