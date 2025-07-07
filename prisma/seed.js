const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
    const role = await prisma.role.createMany({
        data: [
            {
                id: 1,
                name: "user",
            },
            {
                id: 2,
                name: "admin",
            },
            {
                id: 3,
                name: "super-admin",
            },
        ],
    });

    const department = await prisma.department.createMany({
        data: [
            {
                id: 1,
                name: "บริหาร(ADM)",
            },
            {
                id: 2,
                name: "คณะกรรมการบริษัทฯ",
            },
            {
                id: 3,
                name: "นักลงทุนสัมพันธ์และประชาสัมพันธ์ (IR&PR)",
            },
            {
                id: 4,
                name: "แผนกนำเข้า-ส่งออก (Shipping)",
            },
            {
                id: 5,
                name: "บริหารจัดการคุณภาพ(QMR)",
            },
            {
                id: 6,
                name: "แผนกขายและการตลาด (MAR) ",
            },
            {
                id: 7,
                name: "แผนกขายและการตลาด (MAR)",
            },
            {
                id: 8,
                name: "เจ้าหน้าที่ชำนาญการด้านกฎหมาย",
            },
            {
                id: 9,
                name: "ฝ่ายบัญชี(ACC)",
            },
            {
                id: 10,
                name: "แผนกส่งเสริมการลงทุน (BOI)",
            },
            {
                id: 11,
                name: "ฝ่ายการเงิน(FIN)",
            },
            {
                id: 12,
                name: "ฝ่ายจัดซื้อ(PUR)",
            },
            {
                id: 13,
                name: "ฝ่ายบริหารทรัพยากรมนุษย์ (HRD)",
            },
            {
                id: 14,
                name: "ฝ่ายผลิตและพัฒนาผลิตภัณฑ์สำเร็จรูป (DFP)",
            },
            {
                id: 15,
                name: "ฝ่ายวิจัยและพัฒนา (R&D)",
            },
            {
                id: 16,
                name: "ฝ่ายพัฒนาความยั่งยืน (ESG)",
            },
            {
                id: 17,
                name: "ฝ่ายงานเทคโนโลยีสารสนเทศ (IT)",
            },
            {
                id: 18,
                name: "โรงงานยางแท่ง (STR) ",
            },
            {
                id: 19,
                name: "ฝ่ายยานยนต์ (VEH)",
            },
            {
                id: 20,
                name: "ฝ่ายพืชพลังงานและวัตถุดิบก๊าซชีวภาพ (NAP)",
            },
            {
                id: 21,
                name: "ฝ่ายวิศวกรรม (ENG)",
            },
            {
                id: 22,
                name: "ฝ่ายก๊าซชีวภาพ (BIO)",
            },
            {
                id: 23,
                name: "ฝ่ายสิ่งแวดล้อม (ENV)",
            },
            {
                id: 24,
                name: "แผนกบอยเบอร์ (BOILER)",
            },
            {
                id: 25,
                name: "ฝ่ายควบคุมคุณภาพวัตถุดิบ(DRC)",
            },
            {
                id: 26,
                name: "ฝ่ายคลังสินค้า (STO)",
            },
            {
                id: 27,
                name: "สายงานพัฒนาธุรกิจ",
            },
            {
                id: 28,
                name: "โรงงานยางแผ่นรมควัน (RSS)",
            },
            {
                id: 29,
                name: "ฝ่ายห้องปฏิบัติการ (QA)",
            },
            {
                id: 30,
                name: "ฝ่ายควบคุมคุณภาพ (QC)",
            },
            {
                id: 31,
                name: "แผนกความปลอดภัยและอาชีวอนามัย (SAF)",
            },
        ],
    });

    const position = await prisma.position.createMany({
        data: [
            {
                id: 1,
                name: "staff",
            },
            {
                id: 2,
                name: "supervisor",
            },
            {
                id: 3,
                name: "manager",
            },
        ],
    });

    const user = await prisma.user.createMany({
        data: [
            {
                id: 1,
                email: "chuwit@nerubber.com",
                username: "chuwit",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "จึงธนสมบูรณ์",
                fname: "คุณชูวิทย์",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 1,
                positionId: 1,
                roleId: 3,


            },
            {
                id: 2,
                email: "sakchai@nerubber.com",
                username: "sakchai",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "จงสถาพงษ์พันธ์",
                fname: "คุณศักดิ์ชัย",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 1,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 3,
                email: "phanida@nerubber.com",
                username: "phanida",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "จึงธนสมบูรณ์",
                fname: "คุณภณิดา",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 1,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 4,
                email: "py@nerubber.com",
                username: "py",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "อรรถพิสาล",
                fname: "คุณปาร์ย",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 1,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 5,
                email: "kesnaree@nerubber.com",
                username: "kesnaree",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "จองโชติศิริกุล",
                fname: "คุณเกศนรี",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 1,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 6,
                email: "wannapa.ya@nerubber.com",
                username: "wannapa.ya",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "แยงรัมย์",
                fname: "คุณวรรณภา",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 1,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 7,
                email: "parinya.le@nerubber.com",
                username: "parinya.le",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "ลีนะธรรม",
                fname: "คุณปริญญา",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 1,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 8,
                email: "pirada_iso@nerubber.com",
                username: "pirada_iso",
                password:
                    "$2a$10$ifYF7QDSyK68oRnqoJdo7unpoLDsZQph2quF1Hjox4bxWgPqHPVge",
                lname: "โทนะหงษา",
                fname: "คุณภิรดา",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 1,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 9,
                email: "cac@nerubber.com",
                username: "cac",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "โทนะหงษา",
                fname: "คุณภิรดา",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 1,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 10,
                email: "jirayut.ju@nerubber.com",
                username: "jirayut.ju",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "จึงธนสมบูรณ์",
                fname: "คุณจิรายุส",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 1,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 11,
                email: "chanitr.ch@nerubber.com",
                username: "chanitr.ch",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "ชาญชัยณรงค์",
                fname: "คุณชนิตร",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 2,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 12,
                email: "ronachit.ji@nerubber.com",
                username: "ronachit.ji",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "จินะดิษฐ์",
                fname: "คุณรณชิต",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 2,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 13,
                email: "investor@nerubber.com",
                username: "investor",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "นุ่มนวลศรี",
                fname: "คุณอัสรา",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 3,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 14,
                email: "aussara@nerubber.com",
                username: "aussara",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "นุ่มนวลศรี",
                fname: "คุณอัสรา",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 3,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 15,
                email: "chenjira@nerubber.com",
                username: "chenjira",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "ฟักแก้ว",
                fname: "คุณเจนจิรา",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 4,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 16,
                email: "jarunee@nerubber.com",
                username: "jarunee",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "จองวัฒนศักดิ์",
                fname: "คุณจารุณี",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 5,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 17,
                email: "sivimol.pr@nerubber.com",
                username: "sivimol.pr",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "พรมแป้น",
                fname: "คุณศิวิมล",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 5,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 18,
                email: "worawalan.th@nerubber.com",
                username: "worawalan.th",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "ธนูศิลป์",
                fname: "คุณวรวลัญช์",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 5,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 19,
                email: "arnon.ka@nerubber.com",
                username: "arnon.ka",
                password:
                    "$2a$10$nOPBv.TKSPlFEdWZz/jafOqMx6wOD4a8QZDhG7C9DJ/VJYn.sPKUe",
                lname: "กะการดี",
                fname: "คุณอานนท์",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 5,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 20,
                email: "atchara.sa@nerubber.com",
                username: "atchara.sa",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "สามาลา",
                fname: "คุณอัจฉรา",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 5,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 21,
                email: "nattaya.je@nerubber.com",
                username: "nattaya.je",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "เจษฏาพิสิฐ",
                fname: "คุณณัฐธยาน์",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 6,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 22,
                email: "oeyporn.kit@nerubber.com",
                username: "oeyporn.kit",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "กิตติกุศลธรรม",
                fname: "คุณอวยพร",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 6,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 23,
                email: "sorakrit@nerubber.com",
                username: "sorakrit",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "โพธิสาร",
                fname: "คุณสรกฤต",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 7,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 24,
                email: "anan.ka@nerubber.com",
                username: "anan.ka",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "กะการดี",
                fname: "คุณอนันต์",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 7,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 25,
                email: "bhanuwat.ch@nerubber.com",
                username: "bhanuwat.ch",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "ชุมชาติ",
                fname: "คุณภานุวัฒน์",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 7,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 26,
                email: "krisada.pa@nerubber.com",
                username: "krisada.pa",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "ปานลักษ์",
                fname: "คุณกฤษฎา",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 7,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 27,
                email: "krerkchai.ch@nerubber.com",
                username: "krerkchai.ch",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "ชะวะนะเวช",
                fname: "คุณเกริกชัย",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 7,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 28,
                email: "metawadee.th@nerubber.com",
                username: "metawadee.th",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "ทองขาว",
                fname: "คุณเมธาวดี",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 7,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 29,
                email: "panyapon.ch@nerubber.com",
                username: "panyapon.ch",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "จันผ่อง",
                fname: "คุณปัญญาพล",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 7,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 30,
                email: "saranya.su@nerubber.com",
                username: "saranya.su",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "สุดศิลา",
                fname: "คุณศรัณญา",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 7,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 31,
                email: "sirirat.kh@nerubber.com",
                username: "sirirat.kh",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "ขัตติสะ",
                fname: "คุณศิริรัตน์",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 7,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 32,
                email: "suangsuda.wa@nerubber.com",
                username: "suangsuda.wa",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "วังเปียง",
                fname: "คุณสรวงสุดา",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 7,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 33,
                email: "sukanya.ch@nerubber.com",
                username: "sukanya.ch",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "จันทร์หล่ม",
                fname: "คุณสุกัลญา",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 7,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 34,
                email: "wasana.rod@nerubber.com",
                username: "wasana.rod",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "รอดเสถียร",
                fname: "คุณวาสนา",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 7,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 35,
                email: "papitchaya.so@nerubber.com",
                username: "papitchaya.so",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "โสภาหัสดร",
                fname: "คุณปพิชญา",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 7,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 36,
                email: "amirah.pl@nerubber.com",
                username: "amirah.pl",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "พลัฏฐ์สร",
                fname: "คุณอโมราห์ง",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 7,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 37,
                email: "wiwat.yi@nerubber.com",
                username: "wiwat.yi",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "ยิ่งเกียรตินนท์",
                fname: "คุณวิวัฒน์",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 7,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 38,
                email: "narakrong.wu@nerubber.com",
                username: "narakrong.wu",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "วังชัย",
                fname: "คุณนารากรอง",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 7,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 39,
                email: "phuwanat.sr@nerubber.com",
                username: "phuwanat.sr",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "ศรีปุชยพงศ์",
                fname: "คุณภูวณัฐ์",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 7,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 40,
                email: "jarudech.bo@nerubber.com",
                username: "jarudech.bo",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "บุญญสิทธิ์",
                fname: "คุณจารุเดช",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 8,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 41,
                email: "nuttiya.ph@nerubber.com",
                username: "nuttiya.ph",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "ภัทรกิจจานุรักษ์",
                fname: "คุณณัฐิยา",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 9,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 42,
                email: "nongyao.se@nerubber.com",
                username: "nongyao.se",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "สีเขียว",
                fname: "คุณนงเยาว์",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 9,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 43,
                email: "wanida.me@nerubber.com",
                username: "wanida.me",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "มีพวงผล",
                fname: "คุณวนิดา",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 9,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 44,
                email: "saruta@nerubber.com",
                username: "saruta",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "จุ้ยประโคน",
                fname: "คุณศรุตา",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 9,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 45,
                email: "rungtiwa@nerubber.com",
                username: "rungtiwa",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "แย้มชู",
                fname: "คุณรุ่งธิวา",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 9,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 46,
                email: "piriyakron@nerubber.com",
                username: "piriyakron",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "เดียรประโคน",
                fname: "คุณพิริยากร",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 9,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 47,
                email: "sunee.ki@nerubber.com",
                username: "sunee.ki",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "คิดประโคน",
                fname: "คุณสุณีย์",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 9,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 48,
                email: "suchanya.sa@nerubber.com",
                username: "suchanya.sa",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "สวัสดี",
                fname: "คุณสุชัญญา",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 9,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 49,
                email: "sukanya.ta@nerubber.com",
                username: "sukanya.ta",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "ทวีภักดีเสมอ",
                fname: "คุณสุกัญญา",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 9,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 50,
                email: "punnada.kr@nerubber.com",
                username: "punnada.kr",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "ครองชื่น",
                fname: "คุณปุญณดา",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 9,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 51,
                email: "thitirat.ti@nerubber.com",
                username: "thitirat.ti",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "ติงสะ",
                fname: "คุณธิติรัตน์",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 9,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 52,
                email: "chaniporn.so@nerubber.com",
                username: "chaniporn.so",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "สมสนิท",
                fname: "คุณชนิภรณ์",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 9,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 53,
                email: "kanyarat.pu@nerubber.com",
                username: "kanyarat.pu",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "พึ่งตน",
                fname: "คุณกัญญารัตน์",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 9,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 54,
                email: "sereepap.kl@nerubber.com",
                username: "sereepap.kl",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "กลิ่นศรีสุข",
                fname: "คุณเสรีภาพ",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 9,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 55,
                email: "onuma.pr@nerubber.com",
                username: "onuma.pr",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "พรมทะเล",
                fname: "คุณอรอุมา",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 9,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 56,
                email: "orachon.so@nerubber.com",
                username: "orachon.so",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "สมบัติ",
                fname: "คุณอรชร",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 9,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 57,
                email: "korawan.ao@nerubber.com",
                username: "korawan.ao",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "อ้นสมุทร",
                fname: "คุณกรวรรณ",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 10,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 58,
                email: "jeeraporn2525.j@nerubber.com",
                username: "jeeraporn2525.j",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "พะนิจรัมย์",
                fname: "คุณจีราภร",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 11,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 59,
                email: "finance-ner@nerubber.com",
                username: "finance-ner",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "พะนิจรัมย์",
                fname: "คุณจีราภร",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 11,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 60,
                email: "sudasawan.sa@nerubber.com",
                username: "sudasawan.sa",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "สายสุวรรณ",
                fname: "คุณสุดาสวรรค์",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 11,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 61,
                email: "nopparat@nerubber.com",
                username: "nopparat",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "เทียนศิริวงศากุล",
                fname: "คุณนพรัตน์",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 11,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 62,
                email: "pannee.sr@nerubber.com",
                username: "pannee.sr",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "ศรีพรม",
                fname: "คุณพรรณี",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 11,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 63,
                email: "winet.we@nerubber.com",
                username: "winet.we",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "เวทย์รัมย์",
                fname: "คุณวิเนตร",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 11,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 64,
                email: "photchara.ph@nerubber.com",
                username: "photchara.ph",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "ไพศาลพิริยะทรัพย์",
                fname: "คุณพธร",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 11,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 65,
                email: "khwansiri@nerubber.com",
                username: "khwansiri",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "ชาติจอหอ",
                fname: "คุณขวัญศิริ",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 12,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 66,
                email: "sakuna.sa@nerubber.com",
                username: "sakuna.sa",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "สระกิจ",
                fname: "คุณสกุณา",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 12,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 67,
                email: "nattaporn.kh@nerubber.com",
                username: "nattaporn.kh",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "ขวัญสูงเนิน",
                fname: "คุณนัฐพร",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 12,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 68,
                email: "gunn.bu@nerubber.com",
                username: "gunn.bu",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "บุตรไพลอาฌ",
                fname: "คุณกรรณ",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 12,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 69,
                email: "suparerk.kr@nerubber.com",
                username: "suparerk.kr",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "เครือพิมาย",
                fname: "คุณศุภฤกษ์",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 12,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 70,
                email: "jirawat.do@nerubber.com",
                username: "jirawat.do",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "ดวงปาโคตร",
                fname: "คุณจิรวัฒน์",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 12,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 71,
                email: "thanaporn.r@nerubber.com",
                username: "thanaporn.r",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "รัวประโคน",
                fname: "คุณธนพร",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 12,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 72,
                email: "nilawan.jo@nerubber.com",
                username: "nilawan.jo",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "โจมรัมย์",
                fname: "คุณนิลลาวรรณ",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 13,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 73,
                email: "hr@nerubber.com",
                username: "hr",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "โจมรัมย์",
                fname: "คุณนิลลาวรรณ",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 13,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 74,
                email: "ner@nerubber.com",
                username: "ner",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "โจมรัมย์",
                fname: "คุณนิลลาวรรณ",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 13,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 75,
                email: "natchanon.kh@nerubber.com",
                username: "natchanon.kh",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "โคตุทา",
                fname: "คุณณัฐชนน",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 13,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 77,
                email: "pakphoom.ta@nerubber.com",
                username: "pakphoom.ta",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "ตาลีบุตร",
                fname: "คุณภาคภูมิ",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 13,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 78,
                email: "noppawan.na@nerubber.com",
                username: "noppawan.na",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "นารีรักษ์",
                fname: "คุณนพวรรณ",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 13,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 79,
                email: "vipawadee.ma@nerubber.com",
                username: "vipawadee.ma",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "แมลงทับ",
                fname: "คุณวิภาวดี",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 13,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 80,
                email: "rungruedee.ra@nerubber.com",
                username: "rungruedee.ra",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "หรั่งนรินทร์",
                fname: "คุณรุ้งฤดี",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 13,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 81,
                email: "piyathida.pi@nerubber.com",
                username: "piyathida.pi",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "ปิยนันทภาคย์",
                fname: "คุณปิยธิดา",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 13,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 82,
                email: "jariya.ma@nerubber.com",
                username: "jariya.ma",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "เหมียดมาลา",
                fname: "คุณจริยา",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 13,
                positionId: 1,
                roleId: 3,


            },
            {
                id: 83,
                email: "niramol.se@nerubber.com",
                username: "niramol.se",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "สีดา",
                fname: "คุณนิรมล",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 13,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 84,
                email: "thipphawan.ko@nerubber.com",
                username: "thipphawan.ko",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "คูณสัตย์",
                fname: "คุณทิพวรรณ",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 13,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 85,
                email: "supaporn.mo@nerubber.com",
                username: "supaporn.mo",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "หมอดง",
                fname: "คุณสุภาพร",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 13,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 86,
                email: "patchpida.du@nerubber.com",
                username: "patchpida.du",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "ดุษปิยะ",
                fname: "คุณพัชร์พิดา",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 14,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 87,
                email: "kanokwan.ba@nerubber.com",
                username: "kanokwan.ba",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "บัพสุข",
                fname: "คุณกนกวรรณ",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 14,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 88,
                email: "atcharapan.ta@nerubber.com",
                username: "atcharapan.ta",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "ทะรารัมย์",
                fname: "คุณอัจฉราพรรณ",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 14,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 89,
                email: "somjai.kr@nerubber.com",
                username: "somjai.kr",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "กระสิรัมย์",
                fname: "คุณสมใจ",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 14,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 90,
                email: "sopon.ka@nerubber.com",
                username: "sopon.ka",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "คำงาม",
                fname: "คุณโสภณ",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 14,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 91,
                email: "pukwalunk.pr@nerubber.com",
                username: "pukwalunk.pr",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "พรหมเอาะ",
                fname: "คุณภัควลัญชญ์",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 14,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 92,
                email: "Patiwarada.ji@nerubber.com",
                username: "Patiwarada.ji",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "จิตโสภิณ",
                fname: "คุณปติวรฎา",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 15,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 93,
                email: "buntham.bu@nerubber.com",
                username: "buntham.bu",
                password:
                    "$2a$10$ruF6G0NCiI82796qWxioLOdeCcjEfXYOIYLyS0HGy9hsukp8NzQA2",
                lname: "บุตรแสน",
                fname: "คุณบุญธรรม",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 16,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 94,
                email: "chananya.sa@nerubber.com",
                username: "chananya.sa",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "แสนกล้า",
                fname: "คุณชนัญญา",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 16,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 95,
                email: "wittawat.pa@nerubber.com",
                username: "wittawat.pa",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "ปักนก",
                fname: "คุณวิทวัส",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 16,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 97,
                email: "tarawut.je@nerubber.com",
                username: "tarawut.je",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "เจตนา",
                fname: "คุณธราวุฒิ",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 16,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 98,
                email: "admin@nerubberplc.onmicrosoft.com",
                username: "admin",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "ยอดเจริญ",
                fname: "คุณกิตติ",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 17,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 99,
                email: "it-ner@nerubber.com",
                username: "it-ner",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "ยอดเจริญ",
                fname: "คุณกิตติ",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 17,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 100,
                email: "kitti.yo@nerubber.com",
                username: "kitti.yo",
                password:
                    "$2a$10$Ca.WArWslRvsJy/uv80yiO.WlRcYtl2BbTeH3S0Z.EWOec5UGSv9i",
                lname: "ยอดเจริญ",
                fname: "คุณกิตติ",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 17,
                positionId: 1,
                roleId: 3,


            },
            {
                id: 101,
                email: "zoom@nerubber.com",
                username: "zoom",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "ยอดเจริญ",
                fname: "คุณกิตติ",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 17,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 102,
                email: "yongyut.su@nerubber.com",
                username: "yongyut.su",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "ศุภเสถียร",
                fname: "คุณยงยุทธ",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 17,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 103,
                email: "jessada.ph@nerubber.com",
                username: "jessada.ph",
                password:
                    "$2a$10$KoDAW6Nw6p16gyv5O9iN3OVjpHaRb4EvQfb8l2jbGSaGHXBuOBId2",
                lname: "พยัคฆ์กูล",
                fname: "คุณเจษฎา",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 17,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 104,
                email: "pongsatorn.ch@nerubber.com",
                username: "pongsatorn.ch",
                password:
                    "$2a$10$exbof7Dl2rXjlfLN/mybpOxwCsc5H06A2.ynrGDn1MxabNQl9A6l2",
                lname: "ฉันท์ทอง",
                fname: "คุณพงศธร",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 17,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 105,
                email: "suhailee@nerubber.com",
                username: "suhailee",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "ยิตอซอ",
                fname: "คุณซูไฮลี",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 18,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 106,
                email: "amphol.ka@nerubber.com",
                username: "amphol.ka",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "การะเกต",
                fname: "คุณอำพล",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 18,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 107,
                email: "saowalak.sa@nerubber.com",
                username: "saowalak.sa",
                password:
                    "$2a$10$PpyTjJEtcK5RRHmdPyNWyO546Z7X58GqmN2jwTJYUbXrraRnORaaC",
                lname: " ไชยนาพันธ์",
                fname: "คุณเสาวลักษณ์",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 18,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 108,
                email: "adminstr@nerubber.com",
                username: "adminstr",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: " ไชยนาพันธ์",
                fname: "คุณเสาวลักษณ์",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 18,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 109,
                email: "jatuporn.ut@nerubber.com",
                username: "jatuporn.ut",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "อุตลา",
                fname: "คุณจตุพร",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 18,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 110,
                email: "jiranan.ju@nerubber.com",
                username: "jiranan.ju",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "เจือกรัมย์",
                fname: "คุณจิรนันต์",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 18,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 111,
                email: "Supaporn.ch@nerubber.com",
                username: "Supaporn.ch",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "โชคโอฬาร",
                fname: "คุณสุภาพร",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 18,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 112,
                email: "lkanya.no@nerubber.com",
                username: "lkanya.no",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "นพรัตน์",
                fname: "คุณกัญญา",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 18,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 113,
                email: "kesinee.ph@nerubber.com",
                username: "kesinee.ph",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "ผู้มีสัตย์",
                fname: "คุณเกศิณี",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 18,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 114,
                email: "metinee.wi@nerubber.com",
                username: "metinee.wi",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "เวียงฉิมมา",
                fname: "คุณเมทินี",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 18,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 115,
                email: "praiwan.le@nerubber.com",
                username: "praiwan.le",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "ลีประโคน",
                fname: "คุณไพรวัลย์",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 18,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 116,
                email: "sittipong.sa@nerubber.com",
                username: "sittipong.sa",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "ไสวประโคน",
                fname: "คุณสิทธิพงษ์",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 18,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 117,
                email: "kankanit.po@nerubber.com",
                username: "kankanit.po",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "โปยขุนทด",
                fname: "คุณกันต์กนิษฐ์",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 19,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 118,
                email: "seksan.sa@nerubber.com",
                username: "seksan.sa",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "สดมสุข",
                fname: "คุณเสกสรร",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 19,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 119,
                email: "teerasak.hu@nerubber.com",
                username: "teerasak.hu",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "ฮุยประโคน",
                fname: "คุณธีรศักดิ์",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 19,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 120,
                email: "rachan.mu@nerubber.com",
                username: "rachan.mu",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "มูลฉวี",
                fname: "คุณราชัน",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 19,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 121,
                email: "tanawat.an@nerubber.com",
                username: "tanawat.an",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "อังศิวาพงษ์",
                fname: "คุณธนวัฒน์",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 20,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 122,
                email: "wichai.se@nerubber.com",
                username: "wichai.se",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "ศรีพรหม",
                fname: "คุณวิชัย",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 20,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 123,
                email: "Natthadet.ch@nerubber.com",
                username: "Natthadet.ch",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "ชนะประโคน",
                fname: "คุณณัฐเดช",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 21,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 124,
                email: "Wattana.wo@nerubber.com",
                username: "Wattana.wo",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "วงศ์วัฒนะ",
                fname: "คุณวัฒนะ",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 21,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 125,
                email: "ladatip.tr@nerubber.com",
                username: "ladatip.tr",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "ตรีประโคน",
                fname: "คุณลดาทิพย์",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 21,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 126,
                email: "anawat.mo@nerubber.com",
                username: "anawat.mo",
                password:
                    "$2a$10$efcf4ptgtsBjPe5lTFiPDOcHaiqk9nGChhzGMfRjqmuT/lxqlNhgy",
                lname: "มูลพรมมี",
                fname: "คุณอนวัฒน์",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 21,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 127,
                email: "prachaya.tu@nerubber.com",
                username: "prachaya.tu",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "เตือประโคน",
                fname: "คุณปรัชญา",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 21,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 128,
                email: "artid.pr@nerubber.com",
                username: "artid.pr",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "ประลับรักษา",
                fname: "คุณอาทิตย์",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 21,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 129,
                email: "suttiruk.ch@nerubber.com",
                username: "suttiruk.ch",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "ไชยทอง",
                fname: "คุณสุทธิรักษ์",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 21,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 130,
                email: "channarong.ou@nerubber.com",
                username: "channarong.ou",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "อุ่นวงศ์",
                fname: "คุณชาญณรงค์",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 21,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 131,
                email: "oraphan.pa@nerubber.com",
                username: "oraphan.pa",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "ไพรีรณ",
                fname: "คุณอรพรรณ",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 22,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 132,
                email: "phairot.wo@nerubber.com",
                username: "phairot.wo",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "วรธงชัย",
                fname: "คุณไพโรจน์",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 22,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 133,
                email: "chaiyakorn.si@nerubber.com",
                username: "chaiyakorn.si",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "สิงห์ทอง",
                fname: "คุณไชยกรณ์",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 22,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 134,
                email: "nivate.te@nerubber.com",
                username: "nivate.te",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "ตีตรา",
                fname: "คุณนิเวศน์",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 22,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 135,
                email: "yutthakorn.ja@nerubber.com",
                username: "yutthakorn.ja",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "จามิกร",
                fname: "คุณยุทธกร",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 22,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 136,
                email: "ekkapong.do@nerubber.com",
                username: "ekkapong.do",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "ดวงอาจ",
                fname: "คุณเอกพงษ์",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 23,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 137,
                email: "phawinee.ng@nerubber.com",
                username: "phawinee.ng",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "เงินสินธ์",
                fname: "คุณภาวิณี",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 23,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 138,
                email: "thanaphol.ph@nerubber.com",
                username: "thanaphol.ph",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "พงษ์พิทักษ์",
                fname: "คุณธนพล",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 24,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 139,
                email: "somsak.ph@nerubber.com",
                username: "somsak.ph",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "ภูวงษ์",
                fname: "คุณสมศักดิ์",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 24,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 140,
                email: "nattaphon@nerubber.com",
                username: "nattaphon",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "อินทร์ประโคน",
                fname: "คุณณัฐพนธ์",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 25,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 141,
                email: "benja@nerubber.com",
                username: "benja",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "เสริมชื่อ",
                fname: "คุณเบญจา",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 25,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 142,
                email: "drc@nerubber.com",
                username: "drc",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "เสริมชื่อ",
                fname: "คุณเบญจา",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 25,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 143,
                email: "wathiwut.yi@nerubber.com",
                username: "wathiwut.yi",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "ยิ่งยืน",
                fname: "คุณวาทิวุทร",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 26,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 144,
                email: "malinee.lo@nerubber.com",
                username: "malinee.lo",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "ล้อประโคน",
                fname: "คุณมาลินี",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 26,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 145,
                email: "scales@nerubber.com",
                username: "scales",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "ชัยปลัด",
                fname: "คุณอุดมทรัพย์",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 26,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 146,
                email: "chonthisa.sa@nerubber.com",
                username: "chonthisa.sa",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "ทรงนางรอง",
                fname: "คุณชลธิษา",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 26,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 147,
                email: "teeranan.sa@nerubber.com",
                username: "teeranan.sa",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "แสนพงค์",
                fname: "คุณธีระนันท์",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 26,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 148,
                email: "napitpun.pu@nerubber.com",
                username: "napitpun.pu",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "พันธุ์พืช",
                fname: "คุณนพิศพันธ์",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 26,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 149,
                email: "suthasinee.ko@nerubber.com",
                username: "suthasinee.ko",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "กองทรัพย์",
                fname: "คุณสุธาสินี",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 27,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 150,
                email: "rachakasem@nerubber.com",
                username: "rachakasem",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "บริบูรณ์",
                fname: "คุณรัชเกษม",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 28,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 151,
                email: "mani.su@nerubber.com",
                username: "mani.su",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "สุดประโคน",
                fname: "คุณมณี",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 28,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 152,
                email: "patthamaphon.so@nerubber.com",
                username: "patthamaphon.so",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "โสชะรา",
                fname: "คุณปััทมาพร",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 28,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 153,
                email: "udomwit.se@nerubber",
                username: "udomwit.se",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "สีชมพู",
                fname: "คุณอุดมวิทธ",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 28,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 154,
                email: "wichuda.sa@nerubber.com",
                username: "wichuda.sa",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "สวัสดี",
                fname: "คุณวิชุดา",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 29,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 155,
                email: "thanita.sa@nerubber.com",
                username: "thanita.sa",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "สายชุ่มดี",
                fname: "คุณฐานิตา",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 29,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 156,
                email: "patthama.wa@nerubber.com",
                username: "patthama.wa",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "วรรณทอง",
                fname: "คุณปัทมา",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 29,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 157,
                email: "narisara.pr@nerubber.com",
                username: "narisara.pr",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "ประสาร",
                fname: "คุณนริศรา",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 29,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 158,
                email: "khanittha.ya@nerubber.com",
                username: "khanittha.ya",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "ยวนกูล",
                fname: "คุณขนิษฐา",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 29,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 159,
                email: "nusarin.pa@nerubber.com",
                username: "nusarin.pa",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "ภารชัย",
                fname: "คุณนุศรินทร์",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 29,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 160,
                email: "jenjira@nerubber.com",
                username: "jenjira",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "เย็นใจ",
                fname: "คุณเจนจิรา",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 30,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 161,
                email: "salakjit.lo@nerubber.com",
                username: "salakjit.lo",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "โล่ห์สุวรรณ",
                fname: "คุณสลักจิตร",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 30,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 162,
                email: "Rampai.sa@nerubber.com",
                username: "Rampai.sa",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "แสนโคตร์",
                fname: "คุณรำไพ",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 31,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 163,
                email: "chuthamat.si@nerubber.com",
                username: "chuthamat.si",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "ศิริเกล้า",
                fname: "คุณจุฑามาศ",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 31,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 164,
                email: "danita.si@nerubber.com",
                username: "danita.si",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "ศิลาเกษ",
                fname: "คุณดนิตา",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 31,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 165,
                email: "ansiya.ak@nerubber.com",
                username: "ansiya.ak",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "อัครชาติ",
                fname: "คุณอัญศิยา",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 31,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 166,
                email: "superadmin@superadmin.com",
                username: "superadmin",
                password:
                    "$2a$10$uMJWtpTHCvxjGcAcU1ApWuzvwhcVheXlSDXPD7/6OA6IkrcHweJrK",
                lname: "superadmin",
                fname: "superadmin",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 17,
                positionId: 1,
                roleId: 3,


            },
            {
                id: 167,
                email: "user@user.com",
                username: "user",
                password:
                    "$2a$10$oBamGWcnTXw1VSHfxV413.TM9tVdE5dsk/483XZN7Fz.KWMHx3BUW",
                lname: "user",
                fname: "user",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 17,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 168,
                email: "Prasong.ch@nerubber.com",
                username: "Prasong.ch@nerubber.com",
                password:
                    "$2a$10$QDR6lPOf91g2xIbJoTsES.KtV3WLvtI0jw2HiG7EalGzdszEv6H46",
                lname: "ชอบมวย",
                fname: "ประสงค์",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 13,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 169,
                email: "warunee.se@nerubber.com",
                username: "warunee.se@nerubber.com",
                password:
                    "$2a$10$weK6E1FzhMFRFrpJ1ZFrSOao7YQES1WW2Cf3Dj3TmIrWAT7kBkjGu",
                lname: "สีหานาถ",
                fname: "วารุณี",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 16,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 170,
                email: "Mareeda.sa@nerubber.com",
                username: "Mareeda.sa@nerubber.com",
                password:
                    "$2a$10$L.LggJh0IQ/PWTyjXlYmneu36zKmtHR4kH1SybQ8LeP10V7jbN9tG",
                lname: "สมานประธาน",
                fname: "มารีด้า",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 13,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 176,
                email: "123abc@gmail.com",
                username: "123abc@gmail.com",
                password:
                    "$2a$10$iJfhkhyz32qjKyKxvcVEm..kT4IxvoTNk36tevJJA.pzpKmSn6VLq",
                lname: "สมุธิราช",
                fname: "สำรวย",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 13,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 177,
                email: "123@gmail.com",
                username: "123@gmail.com",
                password:
                    "$2a$10$Zt8cKJgsSCSHySP4ggkgEOnpqFCeaRgJVEVYUjw/7sdn7UolWgoUO",
                lname: "บุญบาล",
                fname: "โชติกา ",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 13,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 178,
                email: "123ab@gmail.com",
                username: "123ab@gmail.com",
                password:
                    "$2a$10$m.4xQG3v2Yvrj6lajEXz1eSjCIRumGion8mWNuPTbR4rafQAhzcIi",
                lname: "เสือประโคน",
                fname: "จันทรรัตน์",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 13,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 179,
                email: "1234@gmail.com",
                username: "1234@gmail.com",
                password:
                    "$2a$10$dwUBmsWWWwdy80VXtdhan.vF3gHWiPsII9STucNJ8takEyaHKixUm",
                lname: "ปักกระโทก",
                fname: "จรัสภรณ์",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 13,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 180,
                email: "1234abc@gmail.com",
                username: "1234abc@gmail.com",
                password:
                    "$2a$10$9ljworEKTiidc9yzb0T03.hPlLhCknr2nC//usXjuzIKujIgfntnq",
                lname: "โลกประโคน",
                fname: "ลำใย",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 13,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 181,
                email: "sareepap.kl@nerubber.com",
                username: "sareepap.kl@nerubber.com",
                password:
                    "$2a$10$j6vjS.ttIpQJcudtdDPz2.1KWh9piSV7y1rNWpHrxMosphpu1IYva",
                lname: "กลิ่นศรีสุข",
                fname: "เสรีภาพ",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 9,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 182,
                email: "Nisachon.nu@nerubber.com",
                username: "Nisachon.nu@nerubber.com",
                password:
                    "$2a$10$87aO9jinzQMZGLbMVvlseOpnBEA0AUaeygSTdWx3kNcw8G8qBMLmS",
                lname: "Nvanprakhon",
                fname: "Nisachon",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 19,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 183,
                email: "phawana.kr@nerubber.com",
                username: "phawana@gmail.com",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: " กฤตาคม ",
                fname: "ภาวนา",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 1,
                positionId: 1,
                roleId: 1,


            },
            {
                id: 184,
                email: "Phunsak.pr@nerubber.com",
                username: "Phunsak.pr@nerubber.com",
                password:
                    "$2a$10$P5j1wHMi5pGd0bCM3WTVp.5bLI3qF6ToPOC/Jx4V/ojMR4HX/Mpoa",
                lname: "พรมรุกขชาติ",
                fname: "พันศักดิ์",
                active: true,
                point: 0,
                img: null,
                buttonLinkId: null,
                departmentId: 13,
                positionId: 1,
                roleId: 1,


            },
        ],
    });


    // console.log({ role, department, position, user });
}
main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
