import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const userGH = {
    name: "xdrkush",
}

export const githubSlice = createSlice({
    name: 'github',
    initialState: {
        repos: []
    },
    reducers: {
        getGithubData: (state, action) => {
            // Ensuite nous integrons nos data dans le state github
            state.repos = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { getGithubData } = githubSlice.actions

/* ************************************
 * Ici nous pouvons stocker nos actions
 * ************************************ */

export const fetchDataGithub: any = () => async (dispatch: any) => {
    // // Ici nous utilisons axios afin de call l'API
    const res = await axios.get(`https://api.github.com/users/${userGH.name}/repos`)
    console.log('fetchDataGithub', res.data)
    // Ensuite on dispatch notre resultat avec 
    dispatch({ type: 'github/getGithubData', payload: res.data })
};

// export const maFunction = () => (dispatch) => {
//     Faire des choses ...
//     Envoyer le résultat dans dispatch afin de trouver le bon setter (kelkechoseSlice.reducers)
//     dispatch({ type: 'leStore/leReducer', payload: data })
// };

export default githubSlice.reducer