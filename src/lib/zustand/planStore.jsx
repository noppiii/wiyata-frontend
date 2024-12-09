import create from 'zustand';
import {persist} from "zustand/middleware/persist";
import * as planAPI from "../api/plan";
import * as locationAPI from "../api/loaction";

export const useStore = create(
    persist(
        (set, get) => ({
            id: null,
            userPlan: {},
            conceptForm: {},
            userTravelDay: {},
            initializePlanForm: () => {
                set(() => ({
                    id: null,
                    userPlan: {
                        depart: '',
                        destination: '',
                        name: '',
                        periods: 1,
                        planStatus: 'MAIN',
                        thumbnail: '',
                    },
                    conceptForm:{
                        concept: [],
                    },
                    userTravelDay: {
                        travelDay: '',
                        status: false
                    },
                    selCateLoc: {
                        Attraction: [],
                        Culture: [],
                        Festival: [],
                        Leports: [],
                        Lodge: [],
                        Restaurant: [],
                    }
                }));
            },
            Concepts: [
                { id: 1, name: 'Persahabatan', eword: 'Friendship' },
                { id: 2, name: 'Pasangan', eword: 'Love' },
                { id: 3, name: 'Keluarga', eword: 'Family' },
                { id: 4, name: 'Sendiri', eword: 'Alone' },
            ],
            setId: (input) => {
                set({id: input});
            },
            setName: (input) => {
                set((state) => ({userPlan: { ...state.userPlan, name: input}}));
            },
            setPeriods: (input) => {
                const userTravelDay = get().userTravelDay;
                let arr = [];
                arr = Array.form({length: input}, (_, i) => []);

                if (userTravelDay.travelDay === []) {
                    arr = userTravelDay.travelDay;
                }

                set((state) => ({
                    userPlan: { ...state.userPlan, periods: input },
                    userTravelDay: { ...state.userTravelDay, travelDay: arr },
                }));
            },
            setConcept: (input) => {
                set((state) => ({
                    conceptForm: { ...state.conceptForm, concept: input },
                }));
            },
            setDepart: (input) => {
                const pD = input.getFullYear() + '/' + (input.getMonth() + 1).toString().padStart(2, '0') + '/' + input.getDate().toString().padStart(2, '0');
                set((state) => ({
                    userPlan: { ...state.userPlan, depart: pD },
                }));
            },
            setDestination: (input) => {
                set((state) => ({
                    usPlan: { ...state.userPlan, destination: input },
                }));
            },
            setThumbnail: (input) => {
                set((state) => ({
                    userPlan: { ...state.userPlan, thumbnail: input }
                }));
            },
            zipSelLoc: (obj) => {
                let result = [];
                for (let type in obj) {
                    for (let loc in obj[type]) {
                        result.push(loc['locationId']);
                    }
                }
                return result;
            },
            selCateLoc: {
                Attraction: [],
                Culture: [],
                Festival: [],
                Leports: [],
                Lodge: [],
                Restaurant: [],
            },
            category: {
                Attraction: 'Objek Wisata',
                Culture: 'Fasilitas Budaya',
                Festival: 'Perayaan',
                Leports: 'Olahraga Rekreasi',
                Lodge: 'Akomodasi',
                Restaurant: 'Rumah Makan',
            },
            onAdd: (loc, type) => {
                set((state) => ({
                    selCateLoc: {
                        ...state.selCateLoc,
                        [type]: [...state.selCateLoc[type], loc],
                    },
                }));
            },
            remove: (locId, type) => {
                let tmpSelTypeArr = get().selCateLoc[type].filter((obj) => {
                    return obj.locationId !== locId;
                });
                set((state) => ({
                    selCateLoc: {
                        ...state.selCateLoc,
                        [type]: tmpSelTypeArr,
                    },
                }));
            },
            getPlan: async (id) => {
                const res = await planAPI.getPlan(id);
                const con = await planAPI.getConcpet(id);
                set({ userPlan: res.planForm });
                set({ conceptForm: { concept: con.conceptForm } });
            },
            getSelectedLocations: async () => {
                const planId = get().id;
                const res = await locationAPI.getSelectedLocations(planId);
                if (res.status === 200) {
                    let data = res.data.blockLocations;
                    let tmpSysCateLoc = sysLocStore.getState().sysCateLoc;
                    for (const key in data) {
                        for (let loc of data[key]) {
                            loc.isSelect = true;
                            tmpSysCateLoc[key].some((location, idx) => {
                                if (location.locationId === loc.locationId) {
                                    tmpSysCateLoc[key][idx].isSelect = true;
                                    sysLocStore.setState({
                                        sysCateLoc: tmpSysCateLoc,
                                    });
                                    return true;
                                } else return false;
                            });
                        }
                        set((state) => ({
                            selCateLoc: {
                                ...state.selCateLoc,
                                [key]: data[key],
                            },
                        }));
                    }
                } else {
                    console.log('sel loc get gagal');
                }
            },
        })
    )
)