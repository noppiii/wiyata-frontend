import create from 'zustand';
import { persist } from 'zustand/middleware';
import * as locationAPI from "../api/loaction";

export const memLocStore = create(
    persist(
        (set, get) => ({
            memberLocations: [],

            initializeMemberForm: () => {
                set(() => ({
                    memberLocations: [],
                }));
            },

            getMemberLocations: async () => {
                const res = await locationAPI.getMemberLocation();
                if (!res) return;
                let memLoc = [];
                Object.keys(res.data.blockLocations).forEach((type, i) => {
                    res.data.blockLocations[type].forEach((loc) => {
                        memLoc.push(loc);
                    });
                });
                set(() => ({
                    memberLocations: memLoc,
                }));
                return memLoc;
            },

            createMemberLoc: async (main, coords, sub, typeObj, type) => {
                const { name, share, address1, summary } = main;
                const { latitude, longitude } = coords;
                const { report, address2, image, image1, image2, tel } = sub;

                if (name === undefined) return 'Silakan masukkan nama tujuan perjalanan.';
                else if (address1 === undefined) return 'Silakan pilih alamat tujuan Anda.';
                else if (share === undefined) return 'Silakan pilih apakah Anda dapat membagikannya atau tidak.';
                else if (summary === undefined)
                    return 'Silakan tulis deskripsi singkat tentang tujuan perjalanan Anda.';
                let isShare = false;
                if (share === 'true') isShare = true;
                let loc = {
                    memberLocation: {
                        memberId: 1,
                        isPublic: isShare,
                    },
                    location: {
                        address1,
                        address2,
                        coords: {
                            latitude,
                            longitude,
                        },
                        image,
                        name,
                        isMember: true,
                        areaCode: 39,
                        type: {
                            type,
                        },
                    },
                    typeLocation: typeObj,
                    information: {
                        image1,
                        image2,
                        report,
                        summary,
                        tel,
                    },
                };
                const res = await locationAPI.createMemberLocation(loc);
                if (res.status === 201) {
                    let smallLoc = loc.location;
                    smallLoc.locationId = res.data;
                    set((state) => ({
                        memberLocations: [...state.memberLocations, smallLoc],
                    }));
                    return 'success';
                } else {
                    return 'Kesalahan yang tidak diketahui penyebabnya!!';
                }
            },

            typeInfo: {
                Attraction: {
                    parking: ['Ketersediaan tempat parkir', false],
                    restDate: ['Hari tutup', 'mis. Tutup pada hari Senin dan Selasa'], // null
                    useTime: ['Waktu penggunaan', 'mis. 09:00 ~ 22:00'], // 09:00 ~ 22:00
                },
                Culture: {
                    parking: ['Ketersediaan tempat parkir', false],
                    restDate: ['Libur', 'mis. Tutup pada hari Senin dan Selasa'],
                    fee: ['Harga', '10.000 rupiah'],
                    useTime: ['Waktu penggunaan', 'mis. 09:00 ~ 22:00'],
                    spendTime: ['Waktu yang dibutuhkan', 'mis. 2 jam'],
                },
                Festival: {
                    startDate: ['hari pembukaan', '20240930'], // 20240318
                    endDate: ['hari penutupan', '20241009'], // 20240320
                    homepage: [
                        'Alamat beranda',
                        'http://www.maskdance.com/2019/sub7/sub0.asp',
                    ], // null
                    place: ['Lokasi', 'Jl Jendral Sudirman Surabaya'],
                    placeInfo: ['Informasi lokasi?', 'panggung taman tari topeng'],
                    playTime: ['Waktu acara', '30 menit'],
                    program: ['Program', 'Culture Surabaya'],
                    fee: ['Gunakan harga', 'Gratis atau 10.000 rupiah'],
                },
                Leports: {
                    parking: ['Ketersediaan parkir', false],
                    openPeriod: ['Periode buka', ''],
                    reservation: ['Reservasi', 'Tautan reservasi?'],
                    restDate: ['Hari libur', 'misalnya. Senin, Selasa libur'],
                    fee: ['Biaya penggunaan', 'Gratis atau 10.000 IDR'],
                    useTime: ['Jam operasional', 'misalnya. 09:00 ~ 22:00'],
                },
                Lodge: {
                    checkInTime: ['Waktu check-in', '18:00'],
                    checkOutTime: ['Waktu check-out', '12:00'],
                    cooking: ['Ketersediaan memasak', false],
                    parking: ['Ketersediaan parkir', false],
                    reservationUrl: ['Tautan reservasi', 'www.example.com'],
                    subfacility: ['Fasilitas tambahan', 'Kolam renang'],
                },
                Restaurant: {
                    popularMenu: ['Menu populer', 'Nasi Goreng, soto...'],
                    openTime: ['Jam buka', 'misalnya. 09:00 ~ 22:00'],
                    packing: ['Ketersediaan pembungkusan', false],
                    parking: ['Ketersediaan parkir', false],
                    restDate: ['Hari libur', 'misalnya. Senin, Selasa libur'],
                    menu: ['Menu', 'Soto: 13.000 rupiah, Sate: 25.000 rupiah, ...'],
                },
            },
        }),
        {
            name: 'memberLoc-storage',
            getStorage: () => sessionStorage,
        },
    ),
);