var markers = [];

var European = [
    {
        name: "Santorini Restaurant",
        geometry : {
            location: {
                lat: 37.534791,
                lng: 126.992883
            }
        },
        photo : "https://lh5.googleusercontent.com/-zTklvdD0JjU/V_DKLWrxmiI/AAAAAAAA_xc/fPntp7bgUaEkxtGpI68ddkENmDYe6sngACJkC/w200-h200-k/"
    },
    {
        name: "Petra Restaurant",
        geometry : {
            location: {
                lat: 37.53463189999999,
                lng: 126.98768380000001
            }
        },
        photo : "https://lh5.googleusercontent.com/-Upm2HPL2Ee8/WH9AybMdu6I/AAAAAAAAAAQ/ZdTi6WHWZEEFtHSwLs7TsPQVrk_CrCPvwCLIB/w200-h200-k/"
    },
    {
        name: "Zelen Restaurant",
        geometry : {
            location: {
                lat: 37.5350085,
                lng: 126.99243960000001
            }
        },
        photo : "https://lh5.googleusercontent.com/-imHbvL4G0bw/WF_Po5N5m9I/AAAAAAAAZP0/bgrlZAML_C8v92wJ8c9XSjFjpMx7S-xfwCLIB/w200-h200-k/"
    }
];

var Asian = [
    {
        name: "Jonny Dumpling",
        geometry : {
            location: {
                lat: 37.5338391,
                lng: 126.99371050000002
            }
        },
        photo : "https://lh3.googleusercontent.com/-vg6HAu6Jar4/VYAQAcDTqFI/AAAAAAAADAc/XIskBplrT9oId1Hgpahkfkzese2j6gUug/w200-h200-k/"
    },
    {
        name: "Salam Restaurant",
        geometry : {
            location: {
                lat: 37.53315039999999,
                lng: 126.99755189999996
            }
        },
        photo : "https://lh6.googleusercontent.com/-LNlvlIIWZlA/Ug9aVG5vNTI/AAAAAAAAAQ0/sQdIh0d3c_sXVLPevaYBPubOj8RDwRciQCJkC/w200-h200-k/"
    },
    {
        name: "Buddah´s Belly",
        geometry : {
            location: {
                lat: 37.5343875,
                lng: 126.98837479999997
            }
        },
        photo : "https://lh5.googleusercontent.com/-Ej5XmbVC6Ic/V390u6ZlW4I/AAAAAAAG3qM/Iob2RXoWAfEYapgbWieDyTW2JvNEWengQCJkC/w200-h200-k/"
    },

];

var Beer = [
    {
        name: "3 Alley Pub Seoul",
        geometry : {
            location: {
                lat: 37.534846,
                lng: 126.99843499999997
            }
        },
        photo : "https://lh6.googleusercontent.com/-fNzg2LwwF-g/VYQygu6jisI/AAAAAAAAAUo/Yh1cYxELGxAwYeTes14cljKrRjATqa1qQCJkC/w200-h200-k/"
    },
    {
        name: "샘라이언스",
        geometry : {
            location: {
                lat: 37.5350111,
                lng: 126.99252460000002
            }
        },
        photo : "https://lh3.googleusercontent.com/-rkM5CA5oHjE/VnuwF4ixXfI/AAAAAAAAoJc/TJ3-qIE5ytw0aPsJ0zm44CX0qT6rJDzFACJkC/w200-h200-k/"
    },
    {
        name: "Wolf Hound",
        geometry : {
            location: {
                lat: 37.5340214,
                lng: 126.99343190000002
            }
        },
        photo : "https://lh3.googleusercontent.com/-H11PvHKYvxw/WDGS4qK3-pI/AAAAAAABD64/bC5l94qnNZsMEAoJ-kggtD3rGxctzfiMgCLIB/w200-h200-k/"
    },
];



var init_markers = [
    {
    name: "Masala Zone Soho",
    geometry : {
        location: {
            lat: 51.514102,
            lng: -0.137900
        }
    },
    types: ["bar","restaurant", "food"],
    photo : "https://lh6.googleusercontent.com/-cd53j2frj6U/V9w1wpp-_kI/AAAAAAAAMHc/bbsJ_A4fm7MIEx8YJl65p7QoQ0xRwgQmACJkC/w80-h80-k/"
},  {
    name: "Zizzi",
    geometry : {
        location: {
            lat: 51.514530,
            lng: -0.122665
        }
    },
    types: ["meal_takeaway", "restaurant", "food"],
    photo : "https://lh6.googleusercontent.com/-cd53j2frj6U/V9w1wpp-_kI/AAAAAAAAMHc/bbsJ_A4fm7MIEx8YJl65p7QoQ0xRwgQmACJkC/w80-h80-k/"
},  {
    name: "Big Ben",
    geometry : {
        location: {
            lat: 51.500889,
            lng: -0.124636
        }
    },
    types: ["premise","point_of_interest","establishment"],
    photo : "https://lh6.googleusercontent.com/-cd53j2frj6U/V9w1wpp-_kI/AAAAAAAAMHc/bbsJ_A4fm7MIEx8YJl65p7QoQ0xRwgQmACJkC/w80-h80-k/"
}, {
    name: "Charing Cross Underground Station",
    geometry : {
        location: {
            lat: 51.508679,
            lng: -0.127428
        }
    },
    types: ["subway_station","transit_station","point_of_interest","establishment"],
    photo : "https://lh6.googleusercontent.com/-cd53j2frj6U/V9w1wpp-_kI/AAAAAAAAMHc/bbsJ_A4fm7MIEx8YJl65p7QoQ0xRwgQmACJkC/w80-h80-k/"
}, {
    name: "Royal College of Art",
    geometry : {
        location: {
            lat: 51.501135,
            lng: -0.177372
        }
    },
    types: ["university","point_of_interest","establishment"],
    photo : "https://lh6.googleusercontent.com/-cd53j2frj6U/V9w1wpp-_kI/AAAAAAAAMHc/bbsJ_A4fm7MIEx8YJl65p7QoQ0xRwgQmACJkC/w80-h80-k/"
}, {
    name: 'London Eye',
    geometry : {
        location: {
            lat: 51.503334,
            lng: -0.118959
        }
    },
    types: ["point_of_interest","establishment"],
    photo : "https://lh6.googleusercontent.com/-cd53j2frj6U/V9w1wpp-_kI/AAAAAAAAMHc/bbsJ_A4fm7MIEx8YJl65p7QoQ0xRwgQmACJkC/w80-h80-k/"
}, {
    name: "National Theatre",
    geometry : {
        location: {
            lat: 51.507004,
            lng: -0.114034
        }
    },
    types: ["point_of_interest","establishment"],
    photo : "https://lh6.googleusercontent.com/-cd53j2frj6U/V9w1wpp-_kI/AAAAAAAAMHc/bbsJ_A4fm7MIEx8YJl65p7QoQ0xRwgQmACJkC/w80-h80-k/"
    }
];
