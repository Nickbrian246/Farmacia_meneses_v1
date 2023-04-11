import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

function InputSearchByName() {
    return (
    <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={top100Films}
        sx={{ width: 500 }}
        renderInput={(params) => <TextField {...params} label="buscar producto" />}
    />
    );
}
export {InputSearchByName}

const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
    { label: 'The Dark Knight', year: 2008 },
    { label: '12 Angry Men', year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: 'Pulp Fiction', year: 1994 },
    {
    label: 'The Lord of the Rings: The Return of the King',
    year: 2003,
    },
    { label: 'The Good, the Bad and the Ugly', year: 1966 },
    { label: 'Fight Club', year: 1999 },
    {
    label: 'The Lord of the Rings: The Fellowship of the Ring',
    year: 2001,
    },
    {
    label: 'Star Wars: Episode V - The Empire Strikes Back',
    year: 1980,
    },
    { label: 'Forrest Gump', year: 1994 },
    { label: 'Inception', year: 2010 },
    {
    label: 'The Lord of the Rings: The Two Towers',
    year: 2002,
    }]