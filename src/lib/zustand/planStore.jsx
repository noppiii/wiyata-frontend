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
            getPlanDays: async (planId) => {
                if (get().userTravelDay.status) return;
                if (planId) {
                    set({
                        userTravelDay: {
                            travelDay: [],
                            status: true,
                        },
                    });
                }
                planId = planId ? planId : get().id;
                const resDay = await planAPI.getPlanDay(planId);
                const resPlan = await planAPI.getPlan(planId);

                let planLen;
                if (resPlan && resPlan.httpStatus === 200) {
                    planLen = resPlan.planForm.periods;
                } else {
                    console.log('gagal get plan');
                    return;
                }
                if (resDay && resDay.httpStatus !== 200) {
                    console.log('gagal get day');
                    return;
                }
                if (!resDay) return;

                let tempDayArr = Array.from({length: planLen}, () => []);
                let selLocs = await locationAPI.getSelectedLocations(planId);
                let memLocs = await memLocStore.getState().getMemberLocations();
                let tmpSelCateLoc = {
                    ...selLocs.data.blockLocations,
                    member: memLocs,
                };
                for (let i = 0; i < resDay.dayForm.length; i++) {
                    let tmp = resDay.dayForm[i];
                    for (let key in tmpSelCateLoc) {
                        let flag = 0;
                        for (let j = 0; j < tmpSelCateLoc[key].length; j++) {
                            if (tmpSelCateLoc[key][j].locationId === tmp.locationId) {
                                flag = 1;
                                let idx = tmp.days - 1;
                                tmp.name = tmpSelCateLoc[key][j].name;
                                tmp.image = tmpSelCateLoc[key][j].image;
                                tmp.address1 = tmpSelCateLoc[key][j].address1;

                                if (tempDayArr.length > idx) {
                                    tempDayArr[idx].push(tmp);
                                } else {
                                    tempDayArr.push([tmp]);
                                }
                                break;
                            }
                        }
                        if (flag) break;
                    }
                }
                set({
                    userTravelDay:{
                        travelDay: tempDayArr,
                        status: true,
                    },
                });
            },
            postPlan: async (idx, cP = false) => {
                const userPlan = get().userPlan;
                const conceptForm = get().conceptForm;
                const userTravelDay = get().userTravelDay;
                const id = get().id;

                if (idx === 0 && cP) {
                    delete userPlan.thumbnail;
                    const res = await planAPI.createPlan(userPlan);
                    if (res && res.planId) {
                        set({id: res.planId});
                    } else {

                    }
                } else if (idx === 0 && id > 0) {
                    const plan2 = {...userPlan};
                    typeof plan2.thumbnail !== 'string' && (await planAPI.postThumbnail(id, plan2.thumbnail));
                    delete plan2.planId;
                    delete plan2.thumbnail;
                    await planAPI.postPlan(id, plan2);
                    await planAPI.postConcept(id, conceptForm);
                } else if (idx === 0 && !id) {
                    return 'Silakan tetapkan nama perjalanan';
                } else if (idx === 1){
                    let selLocIdArr = get().zipSelLoc(get().selCateLoc);
                    await locationAPI.postSelectedLocations(id, selLocIdArr);
                } else if (idx === 2){
                    if (!userTravelDay.status) {
                        await planAPI.postPlanDay(userTravelDay, id);
                    } else {
                        await planAPI.updatePlanDay(userTravelDay, id);
                    }
                } else {
                    return 'Gagal menyimpan';
                }
            },
        }),
        {
            name: 'plan-storage',
            getStorage: () => sessionStorage,
        },
    ),
);

export const sysLocStore = create(
    persist(
        (set, get) => ({
            sysCateLoc: {
                Attraction: [],
                Culture: [],
                Festival: [],
                Leports: [],
                Lodge: [],
                Restaurant: []
            },
            sysCateLocCoords: {},
            sysBlockFlag: false,
            sysMarkFlag: false,
            lat: 33.280701,
            lng: 126.570667,

            initializeSysCateLocForm: () => {
                set(() => ({
                    sysCateLoc: {
                        Attraction: [],
                        Culture: [],
                        Festival: [],
                        Leports: [],
                        Lodge: [],
                        Restaurant: [],
                    },
                    sysBlockFlag: false,
                }))
            },

            getSysLoc: async () => {
                if (!get().sysBlockFlag) {
                    const response = await locationAPI.getBlockLocations();
                    if (response.status === 200) {
                        set({
                            sysCateLoc: response.data,
                            sysBlockFlag: true,
                        });
                    }
                }
            },

            getSysLocCoords: async () => {
                if (!get().sysMarkFlag) {
                    const response = await locationAPI.getMarkLocations();
                    if (response.status === 200) {
                        set({
                            sysCateLocCoords: response.data,
                            sysMarkFlag: true,
                        });
                    }
                }
            },

            setLatLng: (id, type) => {
                const coordsList = get().sysCateLocCoords[type];
                const found = coordsList.find((loc) => loc.locationId === id);
                set({ lat: found.coords.latitude });
                set({ lng: found.coords.longitude });
            },

            setLocIsSelect: (type, id, flag) => {
                let tmpLocArr = get().sysCateLoc[type];
                let loc = tmpLocArr.find((val) => val.locationId === id);

                if (flag) {
                    loc.isSelect = true;
                } else {
                    loc.isSelect = false;
                }

                set((state) => ({
                    sysCateLoc: {
                        ...state.sysCateLoc,
                        [type]: tmpLocArr,
                    },
                }));
            },
        }),
        {
            name: 'sysLoc-storage',
            getStorage: () => sessionStorage,
        },
    )
)