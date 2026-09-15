export interface RoomDetail {
  slug: string;
  name: string;
  roomType: string;
  badge: string;
  branchId: string;
  branchName: string;
  branchAddress: string;
  branchPhone: string;
  branchZalo: string;
  heroImage: string;
  heroSubtitle: string;
  youtubeUrl: string;
  galleryImages: string[];
  pricing: {
    hourly: string;
    extraHour: string;
    overnight: string;
    fullDay: string;
  };
  conceptTitle: string;
  conceptDesc: string;
  perks: { title: string; desc: string }[];
  faqs: { question: string; answer: string }[];
  storyHtml: string;
}

export const ROOMS_DETAIL_DATA: Record<string, RoomDetail> = {
  "bad-girl": {
    "slug": "bad-girl",
    "name": "Room - Bad girl",
    "roomType": "Deluxe",
    "badge": "Deluxe Suite",
    "branchId": "branch-mix-boutique-premium-hotel",
    "branchName": "Mix Boutique Premium",
    "branchAddress": "Số 8 ngách 29 ngõ 49 Huỳnh Thúc Kháng, phường Láng, Hà Nội",
    "branchPhone": "0383 104 010",
    "branchZalo": "https://zalo.me/0383104010",
    "heroImage": "/storage/do/4j/do4jgj8crqn9ct3kjme1flp1l9bj_001.jpg",
    "heroSubtitle": "Bad girl mang đến không gian đầy lãng mạn và quyến rũ với tông màu đen chủ đạo được làm nổi bật bởi ánh đèn neon tím huyền ảo. Chiếc giường tròn lớn phủ ga đỏ rực đặt ngay trung tâm, mời gọi các cặp đôi tận hưởng những khoảnh khắc riêng tư ngọt ng...",
    "youtubeUrl": "",
    "galleryImages": [
      "/storage/do/4j/do4jgj8crqn9ct3kjme1flp1l9bj_001.jpg",
      "/storage/3r/t0/3rt09qojjnilalitp5b210karkbw_image.webp",
      "/storage/r4/ox/r4ox0tx9hzqm7rs61s0pxibharl6_zqg5qlhwksu9t1prws93sgmoc7uy_bad-girl-3.webp",
      "/storage/27/tv/27tvv6e632sl9km47g4pbbjgkrbe_6ri59kmcn4d4hwe0bslfbrmdn1g1_bad-girl-1.webp",
      "/storage/da/7r/da7rag3s6yn0dnqy3i1396bktk1i_zqg5qlhwksu9t1prws93sgmoc7uy_bad-girl-3.webp",
      "/storage/wa/g5/wag5x1wansri2cy12hfo3bzj4n9u_6ri59kmcn4d4hwe0bslfbrmdn1g1_bad-girl-1.webp"
    ],
    "pricing": {
      "hourly": "300.000 VND/2h",
      "extraHour": "70.000 VND/h",
      "overnight": "600.000 VND",
      "fullDay": "950.000 VND"
    },
    "conceptTitle": "Concept Độc Bản: Room - Bad girl",
    "conceptDesc": "Private concept Master room 01 Đổi gió riêng tư 02 Setup chỉn chu Concept phòng Đủ lạ để đổi gió, đủ tinh tế để vẫn thoải mái. Master n Slave không đi theo kiểu trang trí quá ồn. Cảm giác chính là nền đỏ đen ấm, chi tiết Indochine, ánh sáng có chiều sâu và một điểm nhấn S-curve để buổi hẹn có thêm trải nghiệm mới. Tổng đỏ đen huyền bí Không gian có độ tương phản mạnh, hợp những cặp đôi muốn một buổi hẹn khác nhịp thường ngày. Nội thất Indochine Chi tiết gỗ, họa tiết và ánh sáng tạo cảm giác boutique, sang hơn một phòng nghỉ thông thường. Ghế S-curve Điểm nhấn trải nghiệm riêng của phòng, được bố trí trong tổng thể kín đáo và có gu. Tiện nghi đủ dùng Điều hòa, WiFi, TV giải trí và các tiện ích cơ bản cho thời gian nghỉ theo giờ hoặc qua đêm. Gọi tư vấn phòng Nhắn Zalo xem ảnh thật",
    "perks": [
      {
        "title": "Bồn tắm sục Jacuzzi đôi",
        "desc": "Không gian thư giãn đẳng cấp với bồn tắm sục lãng mạn, nước nóng ấm áp, bọt xà phòng hoa hồng."
      },
      {
        "title": "Ghế tình yêu Tantra cao cấp",
        "desc": "Đường cong công thái học chuẩn chỉn chu, mang đến cảm xúc thăng hoa bất tận cho cặp đôi."
      },
      {
        "title": "Máy chiếu phim Full HD / 4K",
        "desc": "Màn chiếu siêu rộng xem Netflix, YouTube, chill cùng bộ phim lãng mạn yêu thích."
      },
      {
        "title": "Ánh sáng nghệ thuật Mood Light",
        "desc": "Hệ thống đèn neon, trần ngàn sao và tone màu đa sắc tạo nên không khí quyến rũ độc bản."
      },
      {
        "title": "Miễn phí Cosplay & Đạo cụ",
        "desc": "Mượn trang phục hoá trang quyến rũ, đồ chơi tình yêu và Board Game gắn kết miễn phí."
      },
      {
        "title": "Bảo mật thông tin 100%",
        "desc": "Thủ tục check-in kín đáo, nhận phòng riêng tư, bảo vệ thông tin khách hàng tuyệt đối."
      }
    ],
    "faqs": [
      {
        "question": "Phòng Room - Bad girl có sẵn bồn tắm và máy chiếu không?",
        "answer": "Phòng được trang bị đầy đủ tiện nghi cao cấp theo concept riêng, bao gồm bồn tắm thư giãn, ghế tình yêu Tantra, máy chiếu/Smart TV sắc nét và hệ thống đèn lãng mạn."
      },
      {
        "question": "Tôi có cần đặt cọc trước khi đến nhận phòng không?",
        "answer": "Nếu bạn đến trong vòng 15-20 phút, Mix Hotel sẽ giữ phòng miễn phí không cần cọc. Nếu bạn đặt trước nhiều giờ hoặc qua đêm, vui lòng cọc trước để đảm bảo phòng được giữ 100%."
      },
      {
        "question": "Mix Boutique Hotel có hỗ trợ trang trí tiệc kỷ niệm, sinh nhật không?",
        "answer": "Có! Mix Hotel có 4 gói decor chuyên nghiệp gồm nến, hoa hồng, bong bóng, bánh kem và rượu vang ngoại nhập. Hãy báo trước ít nhất 2-4 tiếng để nhân viên setup hoàn hảo nhất."
      },
      {
        "question": "Khách sạn có cho mượn đồ Cosplay và Board Game tình yêu không?",
        "answer": "Mix Hotel hoàn toàn miễn phí mượn trang phục Cosplay quyến rũ, phụ kiện BDSM tinh tế và bộ Board Game thử thách tình yêu cho tất cả khách hàng lưu trú."
      }
    ],
    "storyHtml": "\n<div class=\"container\">\n<div class=\"content-frame\">\n\n<div class=\"content-body size-1vw data_contents\">\n<p style=\"line-height:1.38; text-align:justify; margin-bottom:13px\">“Có những đêm, người ta không muốn trở nên ngoan.”</p>\n\n<p>Cánh cửa khép lại. Thành phố phía sau biến mất như chưa từng tồn tại.</p>\n\n<p><img alt=\"Phòng khách sạn tình yêu Bad Girl sở hữu phong cách thiết kế đầy mê hoặc\" src=\"/storage/6r/i5/6ri59kmcn4d4hwe0bslfbrmdn1g1_bad-girl-1.webp\"></p>\n\n<p>Ánh tím đổ xuống từ trần gương, phản chiếu lên những mảng hồng và đen đầy mê hoặc. Trong khoảnh khắc ấy, Badgirl không còn là một căn phòng – nó giống như hậu trường của một bộ phim điện ảnh, nơi mọi quy tắc thường ngày đều được phép tạm quên đi.</p>\n\n<p><img alt=\"Những giá trị cảm xúc khác biệt khi lựa chọn không gian Bad Girl tại Mix Hotel\" src=\"/storage/7c/0j/7c0j6wusuww6k065cql63ppywrl1_bad-girl-2.webp\"></p>\n\n<p>Chiếc giường lồng chim nằm giữa không gian như một biểu tượng của sự nổi loạn đầy quyến rũ. Những tấm gương trên trần và tường khiến từng ánh nhìn, từng nụ cười, từng cái chạm trở nên sống động hơn gấp nhiều lần. Và ở trung tâm căn phòng, cột Pole Dance đứng đó như một lời mời gọi cho sự tự do, cá tính và đầy cảm xúc.</p>\n\n<p><img alt=\"Hệ thống tiện ích cao cấp nâng tầm trải nghiệm nghỉ dưỡng\" src=\"/storage/zq/g5/zqg5qlhwksu9t1prws93sgmoc7uy_bad-girl-3.webp\"></p>\n\n<p>Hãy tưởng tượng một buổi tối chỉ có hai người, tiếng nhạc vang nhẹ, ánh đèn đổi màu chậm rãi, và mọi sự chú ý đều hướng về nhau. Không cần chuẩn bị điều gì quá cầu kỳ, bởi chính không gian này đã tạo nên cảm giác đặc biệt ngay từ phút đầu tiên.</p>\n\n<p><img alt=\"Hướng dẫn cách thức đặt phòng nhanh chóng tại Mix Hotel\" src=\"/storage/g5/vg/g5vggwufcph479slyjcocybia2g5_bad-girl-4.webp\"></p>\n\n<p>Badgirl dành cho những cặp đôi không tìm kiếm sự an toàn của những buổi hẹn quen thuộc. Họ tìm kiếm cảm giác mới, một chút táo bạo, một chút bí ẩn và rất nhiều rung động.</p>\n\n<p>Đêm nay, hãy thử sống khác đi một chút.</p>\n\n<p>Biết đâu, phiên bản quyến rũ nhất của hai bạn đang chờ ở phía sau cánh cửa này.</p>\n\n</div>\n</div>\n</div>\n"
  },
  "inferno": {
    "slug": "inferno",
    "name": "VIP Room - Inferno",
    "roomType": "VIP",
    "badge": "VIP Suite",
    "branchId": "branch-mix-boutique-premium-hotel",
    "branchName": "Mix Boutique Premium",
    "branchAddress": "Số 8 ngách 29 ngõ 49 Huỳnh Thúc Kháng, phường Láng, Hà Nội",
    "branchPhone": "0383 104 010",
    "branchZalo": "https://zalo.me/0383104010",
    "heroImage": "/storage/gf/yb/gfybu3xn4qupjynq9xq9t8p0gymy_102.jpg",
    "heroSubtitle": "Inferno lấy gam màu đỏ và đen làm chủ đạo, tạo nên một bầu không khí rực lửa và đầy đam mê. Trung tâm căn phòng là chiếc giường tròn lớn được đặt trong một chiếc lồng chim màu đỏ nổi bật, gợi lên sự bí ẩn và quyến rũ. Gương được sử dụng rộng khắp ...",
    "youtubeUrl": "",
    "galleryImages": [
      "/storage/gf/yb/gfybu3xn4qupjynq9xq9t8p0gymy_102.jpg",
      "/storage/9w/8n/9w8ntpg7syljfrz31mfcnnskd8dj_481172976_940777224895523_2802121859180888131_n.webp",
      "/storage/11/m6/11m6011kt1r7efbgpn2i0fo8rsnx_614155145_1174502471522996_5047488297267466427_n.webp"
    ],
    "pricing": {
      "hourly": "400.000 VND/2h",
      "extraHour": "80.000 VND/h",
      "overnight": "750.000 VND",
      "fullDay": "1.200.000 VND"
    },
    "conceptTitle": "Concept Độc Bản: VIP Room - Inferno",
    "conceptDesc": "Private concept Master room 01 Đổi gió riêng tư 02 Setup chỉn chu Concept phòng Đỏ là để đốt lửa, đen là để giữ bí mật . Inferno không cần quá nhiều chi tiết để gây ấn tượng. Gam đỏ – đen đầy táo bạo, ánh sáng tím hồng, những mảng gương phản chiếu và chiếc giường tròn đặt trong lồng chim đỏ tạo nên một không gian vừa quyến rũ, vừa bí ẩn. Thêm một bồn tắm riêng tư để buổi hẹn hò trở nên đặc biệt hơn. Tổng đỏ đen huyền bí Không gian có độ tương phản mạnh, hợp những cặp đôi muốn một buổi hẹn khác nhịp thường ngày. Nội thất Indochine Chi tiết gỗ, họa tiết và ánh sáng tạo cảm giác boutique, sang hơn một phòng nghỉ thông thường. Ghế S-curve Điểm nhấn trải nghiệm riêng của phòng, được bố trí trong tổng thể kín đáo và có gu. Tiện nghi đủ dùng Điều hòa, WiFi, TV giải trí và các tiện ích cơ bản cho thời gian nghỉ theo giờ hoặc qua đêm. Gọi tư vấn phòng Nhắn Zalo xem ảnh thật",
    "perks": [
      {
        "title": "Bồn tắm sục Jacuzzi đôi",
        "desc": "Không gian thư giãn đẳng cấp với bồn tắm sục lãng mạn, nước nóng ấm áp, bọt xà phòng hoa hồng."
      },
      {
        "title": "Ghế tình yêu Tantra cao cấp",
        "desc": "Đường cong công thái học chuẩn chỉn chu, mang đến cảm xúc thăng hoa bất tận cho cặp đôi."
      },
      {
        "title": "Máy chiếu phim Full HD / 4K",
        "desc": "Màn chiếu siêu rộng xem Netflix, YouTube, chill cùng bộ phim lãng mạn yêu thích."
      },
      {
        "title": "Ánh sáng nghệ thuật Mood Light",
        "desc": "Hệ thống đèn neon, trần ngàn sao và tone màu đa sắc tạo nên không khí quyến rũ độc bản."
      },
      {
        "title": "Miễn phí Cosplay & Đạo cụ",
        "desc": "Mượn trang phục hoá trang quyến rũ, đồ chơi tình yêu và Board Game gắn kết miễn phí."
      },
      {
        "title": "Bảo mật thông tin 100%",
        "desc": "Thủ tục check-in kín đáo, nhận phòng riêng tư, bảo vệ thông tin khách hàng tuyệt đối."
      }
    ],
    "faqs": [
      {
        "question": "Phòng VIP Room - Inferno có sẵn bồn tắm và máy chiếu không?",
        "answer": "Phòng được trang bị đầy đủ tiện nghi cao cấp theo concept riêng, bao gồm bồn tắm thư giãn, ghế tình yêu Tantra, máy chiếu/Smart TV sắc nét và hệ thống đèn lãng mạn."
      },
      {
        "question": "Tôi có cần đặt cọc trước khi đến nhận phòng không?",
        "answer": "Nếu bạn đến trong vòng 15-20 phút, Mix Hotel sẽ giữ phòng miễn phí không cần cọc. Nếu bạn đặt trước nhiều giờ hoặc qua đêm, vui lòng cọc trước để đảm bảo phòng được giữ 100%."
      },
      {
        "question": "Mix Boutique Hotel có hỗ trợ trang trí tiệc kỷ niệm, sinh nhật không?",
        "answer": "Có! Mix Hotel có 4 gói decor chuyên nghiệp gồm nến, hoa hồng, bong bóng, bánh kem và rượu vang ngoại nhập. Hãy báo trước ít nhất 2-4 tiếng để nhân viên setup hoàn hảo nhất."
      },
      {
        "question": "Khách sạn có cho mượn đồ Cosplay và Board Game tình yêu không?",
        "answer": "Mix Hotel hoàn toàn miễn phí mượn trang phục Cosplay quyến rũ, phụ kiện BDSM tinh tế và bộ Board Game thử thách tình yêu cho tất cả khách hàng lưu trú."
      }
    ],
    "storyHtml": "\n<div class=\"container\">\n<div class=\"content-frame\">\n\n<div class=\"content-body size-1vw data_contents\">\n<p style=\"line-height:1.38; text-align:justify; margin-bottom:13px\">“Ngọn lửa đẹp nhất là ngọn lửa được thắp lên bởi cảm xúc.”</p>\n\n<p>Ngay khi bước vào Inferno, điều đầu tiên bạn cảm nhận không phải là sự sang trọng.</p>\n\n<p>Mà là sức nóng.</p>\n\n<p><img alt=\"Inferno - Không gian nghệ thuật lấy cảm hứng từ sự rực cháy và đam mê\" src=\"/storage/ri/q6/riq6yqpm42rie2x7b0r2b3fn955q_inferno-1.webp\"></p>\n\n<p>Sắc đỏ bao trùm toàn bộ không gian rộng lớn như một cảnh phim giữa đêm, nơi mọi cảm xúc đều trở nên mãnh liệt hơn. Chiếc giường lồng chim cỡ lớn nằm ở trung tâm căn phòng như trái tim của Inferno – vừa quyền lực, vừa cuốn hút, vừa khiến người ta không thể rời mắt.</p>\n\n<p><img alt=\"Nghệ thuật sắp đặt ánh sáng và gương phản chiếu\" src=\"/storage/4l/a0/4la04qp08v87er5iih3z9dx3pftt_inferno-3.webp\"></p>\n\n<p>Ở một góc khác, bồn Jacuzzi lấp lánh dưới ánh đèn dịu nhẹ. Hơi nước bốc lên chậm rãi, xóa nhòa mọi mệt mỏi của một ngày dài. Hai ly đồ uống, một bản nhạc yêu thích, và thời gian dường như trôi chậm lại chỉ để dành cho hai người.</p>\n\n<p><img alt=\"Bồn tắm đôi thiết kế lộ thiên\" src=\"/storage/b0/rj/b0rj58xzlo4muevuhc10ow9jqtw4_inferno-6.webp\"></p>\n\n<p>Khi đêm xuống, Smart TV trở thành màn hình riêng của câu chuyện tình yêu ấy. Có thể là một bộ phim lãng mạn, có thể là một trận cười không dứt, hoặc cũng có thể là những khoảng lặng chỉ cần nhìn nhau là đủ.</p>\n\n<p><img alt=\"Ngôn ngữ thiết kế qua gam màu chủ đạo phòng Inferno\" src=\"/storage/ub/lr/ublr9a1bykvcnaxd444jg3iwt2al_inferno-2.webp\"></p>\n\n<p>Inferno không dành cho những cuộc gặp vội vàng.</p>\n\n<p>Nó dành cho những dịp đặc biệt: kỷ niệm ngày yêu, sinh nhật, cầu hôn, hoặc đơn giản là khi bạn muốn nói với người bên cạnh rằng “em/anh xứng đáng với những điều tuyệt vời nhất”.</p>\n\n<p><img alt=\"Chiếc giường tròn lớn đặt trong lồng chim màu đỏ\" src=\"/storage/o0/dk/o0dktq63bjc8q5kbzhzjubmmzzt3_inferno-5.webp\"></p>\n\n<p>Có những khách sạn cho bạn một chỗ nghỉ.</p>\n\n<p>Inferno cho bạn một đêm mà nhiều năm sau vẫn còn nhớ rõ ánh đèn, tiếng cười và cảm giác khi bàn tay ấy nắm lấy tay mình.</p>\n\n<p><img alt=\"Không gian đậm chất điện ảnh\" src=\"/storage/uq/ml/uqmlo8g34ir0p2zufv9hyfeogiuo_inferno-7.webp\"></p>\n\n<p><img alt=\"Những điểm nhấn độc bản chỉ có tại hạng phòng Inferno\" src=\"/storage/9d/e0/9de0u02qs8k99ovfcpdp5ua364p8_inferno-4.webp\"></p>\n\n<p><img alt=\"Hệ thống tiện nghi cao cấp phục vụ mọi cung bậc cảm xúc\" src=\"/storage/hm/ud/hmudvd3585nlwgsxqxzx6rjvrpzf_inferno-8.webp\"></p>\n\n<p><img alt=\"Tiện ích giải trí và thư giãn tiêu chuẩn của phòng tình yêu Inferno\" src=\"/storage/ui/r6/uir65dq2grxi4twf9ok5zc4341gs_inferno-9.webp\"></p>\n\n<p><img alt=\"Tại sao phòng khách sạn tình yêu Inferno là lựa chọn hàng đầu cho một buổi hẹn hò hoàn hảo?\" src=\"/storage/cw/iv/cwivbqe3w7s6qmm9x0vfcgzjs5o4_inferno-11.webp\"></p>\n\n<p><img alt=\"Không gian yên tĩnh, lãng mạn\" src=\"/storage/3n/sj/3nsjaqxx6hx33w2bfjfzwe8jlacs_inferno-12.webp\"></p>\n\n</div>\n</div>\n</div>\n"
  },
  "master-n-slave": {
    "slug": "master-n-slave",
    "name": "Room - Master n Slave",
    "roomType": "Deluxe",
    "badge": "Deluxe Suite",
    "branchId": "branch-mix-boutique-premium-hotel",
    "branchName": "Mix Boutique Premium",
    "branchAddress": "Số 8 ngách 29 ngõ 49 Huỳnh Thúc Kháng, phường Láng, Hà Nội",
    "branchPhone": "0383 104 010",
    "branchZalo": "https://zalo.me/0383104010",
    "heroImage": "/storage/tp/c1/tpc1w7dl3b8d3jsn0997qcgcy9zt_201-master-n-slave.jpg",
    "heroSubtitle": "Master 'n' Slave được thiết kế với phong cách cổ điển và đầy quyền lực, lấy tông màu đỏ đen làm chủ đạo. Điểm nhấn của căn phòng là chiếc giường bốn cọc gỗ lớn, tạo nên một không gian vừa sang trọng vừa bí ẩn. Rèm cửa nhung đỏ buông rủ cùng những ...",
    "youtubeUrl": "",
    "galleryImages": [
      "/storage/tp/c1/tpc1w7dl3b8d3jsn0997qcgcy9zt_201-master-n-slave.jpg",
      "/storage/zh/dq/zhdqmig83xasg6638owg9ycdp1k3_image.webp",
      "/storage/bw/qg/bwqgnr727x8n9o20946x082so1hq_kfee2h63865s5kjeldm9aan8qk8b_master-n-slave-1.webp"
    ],
    "pricing": {
      "hourly": "300.000 VND/2h",
      "extraHour": "70.000 VND/h",
      "overnight": "600.000 VND",
      "fullDay": "950.000 VND"
    },
    "conceptTitle": "Concept Độc Bản: Room - Master n Slave",
    "conceptDesc": "Private concept Master room 01 Đổi gió riêng tư 02 Setup chỉn chu Concept phòng Đủ táo bạo để đổi gió, đủ tinh tế để tận hưởng riêng tư . Master n Slave tạo dấu ấn bằng sự kết hợp giữa đỏ quyền lực, đen huyền bí và những chi tiết mang hơi hướng cổ điển. Giường bốn cọc gỗ lớn, rèm nhung đỏ, nội thất tối màu cùng ánh sáng có chiều sâu tạo nên một không gian vừa sang trọng, vừa kịch tính cho những cặp đôi muốn thử một trải nghiệm khác biệt. Tông đỏ đen đầy quyền lực Sự tương phản giữa đỏ và đen tạo nên cảm giác mạnh về thị giác, trong khi chất liệu gỗ, nhung và ánh sáng ấm giúp không gian vẫn giữ được nét sang trọng, thoải mái. Đây là lựa chọn phù hợp cho những cặp đôi muốn đổi nhịp buổi hẹn và khám phá một concept táo bạo hơn. Nội thất Indochine Chi tiết gỗ, họa tiết và ánh sáng tạo cảm giác boutique, sang hơn một phòng nghỉ thông thường. Ghế S-curve Điểm nhấn trải nghiệm riêng của phòng, được bố trí trong tổng thể kín đáo và có gu. Tiện nghi đủ dùng Điều hòa, WiFi, TV giải trí và các tiện ích cơ bản cho thời gian nghỉ theo giờ hoặc qua đêm. Gọi tư vấn phòng Nhắn Zalo xem ảnh thật",
    "perks": [
      {
        "title": "Bồn tắm sục Jacuzzi đôi",
        "desc": "Không gian thư giãn đẳng cấp với bồn tắm sục lãng mạn, nước nóng ấm áp, bọt xà phòng hoa hồng."
      },
      {
        "title": "Ghế tình yêu Tantra cao cấp",
        "desc": "Đường cong công thái học chuẩn chỉn chu, mang đến cảm xúc thăng hoa bất tận cho cặp đôi."
      },
      {
        "title": "Máy chiếu phim Full HD / 4K",
        "desc": "Màn chiếu siêu rộng xem Netflix, YouTube, chill cùng bộ phim lãng mạn yêu thích."
      },
      {
        "title": "Ánh sáng nghệ thuật Mood Light",
        "desc": "Hệ thống đèn neon, trần ngàn sao và tone màu đa sắc tạo nên không khí quyến rũ độc bản."
      },
      {
        "title": "Miễn phí Cosplay & Đạo cụ",
        "desc": "Mượn trang phục hoá trang quyến rũ, đồ chơi tình yêu và Board Game gắn kết miễn phí."
      },
      {
        "title": "Bảo mật thông tin 100%",
        "desc": "Thủ tục check-in kín đáo, nhận phòng riêng tư, bảo vệ thông tin khách hàng tuyệt đối."
      }
    ],
    "faqs": [
      {
        "question": "Phòng Room - Master n Slave có sẵn bồn tắm và máy chiếu không?",
        "answer": "Phòng được trang bị đầy đủ tiện nghi cao cấp theo concept riêng, bao gồm bồn tắm thư giãn, ghế tình yêu Tantra, máy chiếu/Smart TV sắc nét và hệ thống đèn lãng mạn."
      },
      {
        "question": "Tôi có cần đặt cọc trước khi đến nhận phòng không?",
        "answer": "Nếu bạn đến trong vòng 15-20 phút, Mix Hotel sẽ giữ phòng miễn phí không cần cọc. Nếu bạn đặt trước nhiều giờ hoặc qua đêm, vui lòng cọc trước để đảm bảo phòng được giữ 100%."
      },
      {
        "question": "Mix Boutique Hotel có hỗ trợ trang trí tiệc kỷ niệm, sinh nhật không?",
        "answer": "Có! Mix Hotel có 4 gói decor chuyên nghiệp gồm nến, hoa hồng, bong bóng, bánh kem và rượu vang ngoại nhập. Hãy báo trước ít nhất 2-4 tiếng để nhân viên setup hoàn hảo nhất."
      },
      {
        "question": "Khách sạn có cho mượn đồ Cosplay và Board Game tình yêu không?",
        "answer": "Mix Hotel hoàn toàn miễn phí mượn trang phục Cosplay quyến rũ, phụ kiện BDSM tinh tế và bộ Board Game thử thách tình yêu cho tất cả khách hàng lưu trú."
      }
    ],
    "storyHtml": "\n<div class=\"container\">\n<div class=\"content-frame\">\n\n<div class=\"content-body size-1vw data_contents\">\n<p style=\"line-height:1.38; text-align:justify; margin-bottom:13px\">“Mọi câu chuyện hấp dẫn đều bắt đầu bằng một bí mật.”</p>\n\n<p>Không gian mở ra bằng sắc đỏ trầm và đen sâu, như những khung hình đầu tiên của một bộ phim noir đầy mê hoặc.</p>\n\n<p><img alt=\"Không gian nghệ thuật đầy quyền lực của phòng tình yêu Master N Slave mang đến\" src=\"/storage/kf/ee/kfee2h63865s5kjeldm9aan8qk8b_master-n-slave-1.webp\"></p>\n\n<p>Master n Slave không phô trương. Nó quyến rũ theo cách của những điều càng khám phá càng cuốn hút.</p>\n\n<p>Nội thất Indochine mang đến cảm giác sang trọng cổ điển: những đường nét tinh tế, ánh đèn vàng ấm, và bầu không khí khiến người ta muốn nói nhỏ hơn, nhìn lâu hơn và cảm nhận nhiều hơn. Ở giữa không gian ấy, chiếc ghế tình yêu không chỉ là một món nội thất – nó là điểm nhấn của sự tò mò và kết nối.</p>\n\n<p><img alt=\"Không gian nghệ thuật đầy quyền lực của phòng tình yêu Master N Slave mang đến\" src=\"/storage/yv/rg/yvrgi2nkwd3qdrhtni2yzdy618jm_master-n-slave-2.webp\"></p>\n\n<p>Hãy tưởng tượng một buổi tối mưa nhẹ ngoài cửa sổ. Hai người ngồi cạnh nhau, chia sẻ những câu chuyện chưa từng kể, những mong muốn chưa từng nói thành lời. Không gian này có một khả năng kỳ lạ: khiến người ta dễ mở lòng hơn.</p>\n\n<p><img alt=\"Sự kết hợp hoàn hảo giữa yếu tố nhập vai và sự sang trọng\" src=\"/storage/kl/cn/klcnnqtm3nwz2t8hi5jlfp0tv5uj_master-n-slave-3.webp\"></p>\n\n<p>Không cần quá nhiều ánh sáng rực rỡ, không cần những hiệu ứng choáng ngợp. Chính sự trầm lắng của Master n Slave mới tạo nên sức hút riêng – giống như một bản nhạc jazz nghe càng lâu càng thấm.</p>\n\n<p><img alt=\"Những lý do khiến cặp đôi yêu thích trải nghiệm tại phòng Master N Slave\" src=\"/storage/sj/qv/sjqvd0kek8fagevesmxzx8fweyuy_master-n-slave-4.webp\"></p>\n\n<p>Đây là căn phòng dành cho những cặp đôi đã đi qua sự ồn ào ban đầu và muốn tìm một trải nghiệm sâu hơn, tinh tế hơn, trưởng thành hơn.</p>\n\n<p><img alt=\"Những cung bậc cảm xúc mới lạ thông qua hình thức nhập vai\" src=\"/storage/tk/yw/tkywwy0wruzknekwcyzwr163gr0a_master-n-slave-5.webp\"></p>\n\n<p>Một nơi để khám phá không chỉ không gian, mà còn khám phá nhau theo một cách hoàn toàn mới.</p>\n\n<p><img alt=\"Không gian lý tưởng để gắn kết và hâm nóng tình cảm lứa đôi\" src=\"/storage/fb/e3/fbe3qyxs4b6mmu3irh5iy1biv5zu_master-n-slave-6.webp\"></p>\n\n<p>Và đôi khi, điều khiến một đêm trở nên đáng nhớ không phải là những gì diễn ra.</p>\n\n<p>Mà là cảm giác bí ẩn còn ở lại rất lâu sau khi rời đi.</p>\n\n<p><img alt=\"Góc check-in mang phong cách nghệ thuật độc bản cho các cặp đôi\" src=\"/storage/5u/al/5ualmefwhqn80gvs90qdi7efy3al_master-n-slave-7.webp\"></p>\n\n<p><img alt=\"Hệ thống tiện nghi cao cấp được trang bị trong phòng Master N Slave\" src=\"/storage/v8/gj/v8gjjo3o7x6cwuzdvqn7l1zcu1yh_master-n-slave-8.webp\"></p>\n\n<p><img alt=\"Vì sao Mix Hotel là lựa chọn hàng đầu cho những buổi hẹn hò riêng tư?\" src=\"/storage/oc/35/oc35l0wdmk87dksjdwkwwb8q60ec_master-n-slave-9.webp\"></p>\n\n<p><img alt=\"Hướng dẫn đặt phòng Master N Slave tại hệ thống Mix Hotel\" src=\"/storage/s1/cd/s1cdh65gcdympi7h0mhlamvsrir0_master-n-slave.webp\"></p>\n\n</div>\n</div>\n</div>\n"
  },
  "galaxy": {
    "slug": "galaxy",
    "name": "Room - Galaxy",
    "roomType": "Superior",
    "badge": "Superior Suite",
    "branchId": "branch-mix-boutique-premium-hotel",
    "branchName": "Mix Boutique Premium",
    "branchAddress": "Số 8 ngách 29 ngõ 49 Huỳnh Thúc Kháng, phường Láng, Hà Nội",
    "branchPhone": "0383 104 010",
    "branchZalo": "https://zalo.me/0383104010",
    "heroImage": "/storage/63/r7/63r7hvzdxw4kznzy14srvy4fkwdo_202-galaxy.jpg",
    "heroSubtitle": "Phòng Galaxy đưa các cặp đôi vào một không gian lãng mạn như dải ngân hà. Căn phòng được trang trí với gam màu tối, tạo cảm giác như bầu trời đêm. Điểm nhấn là trần nhà được treo đầy những chuỗi đèn lấp lánh mô phỏng các vì sao, cùng với đèn neon ...",
    "youtubeUrl": "",
    "galleryImages": [
      "/storage/63/r7/63r7hvzdxw4kznzy14srvy4fkwdo_202-galaxy.jpg",
      "/storage/o6/5p/o65pnmyl3xorx42dw4189ncrt9vx_image_(1).webp",
      "/storage/t1/k8/t1k85wxnfjtc0mr0p6mmzpiu1r7t_9b7zdsk1rong7ncfj76ooknr1ky3_galaxy-1.webp"
    ],
    "pricing": {
      "hourly": "199.000 VND/2h",
      "extraHour": "60.000 VND/h",
      "overnight": "500.000 VND",
      "fullDay": "800.000 VND"
    },
    "conceptTitle": "Concept Độc Bản: Room - Galaxy",
    "conceptDesc": "Private concept Master room 01 Đổi gió riêng tư 02 Setup chỉn chu Concept phòng Hẹn nhau giữa ngân hà, để đêm nay chỉ còn hai ta . Galaxy đưa bạn bước vào một bầu trời đêm riêng tư với những vì sao lấp lánh trên trần, ánh đèn neon đầy mê hoặc và sắc tối huyền bí. Một không gian đủ khác biệt để buổi hẹn trở thành một chuyến du hành chỉ dành cho hai người. Bầu trời đêm riêng tư với những vì sao lấp lánh Lấy cảm hứng từ dải ngân hà với ánh sao lung linh, gam màu tối huyền bí và những mảng gương tạo hiệu ứng thị giác độc đáo. Một căn phòng dành cho những cuộc hẹn muốn thoát khỏi sự quen thuộc và tìm kiếm một trải nghiệm thật khác. Nội thất Indochine Chi tiết gỗ, họa tiết và ánh sáng tạo cảm giác boutique, sang hơn một phòng nghỉ thông thường. Ghế S-curve Điểm nhấn trải nghiệm riêng của phòng, được bố trí trong tổng thể kín đáo và có gu. Tiện nghi đủ dùng Điều hòa, WiFi, TV giải trí và các tiện ích cơ bản cho thời gian nghỉ theo giờ hoặc qua đêm. Gọi tư vấn phòng Nhắn Zalo xem ảnh thật",
    "perks": [
      {
        "title": "Bồn tắm sục Jacuzzi đôi",
        "desc": "Không gian thư giãn đẳng cấp với bồn tắm sục lãng mạn, nước nóng ấm áp, bọt xà phòng hoa hồng."
      },
      {
        "title": "Ghế tình yêu Tantra cao cấp",
        "desc": "Đường cong công thái học chuẩn chỉn chu, mang đến cảm xúc thăng hoa bất tận cho cặp đôi."
      },
      {
        "title": "Máy chiếu phim Full HD / 4K",
        "desc": "Màn chiếu siêu rộng xem Netflix, YouTube, chill cùng bộ phim lãng mạn yêu thích."
      },
      {
        "title": "Ánh sáng nghệ thuật Mood Light",
        "desc": "Hệ thống đèn neon, trần ngàn sao và tone màu đa sắc tạo nên không khí quyến rũ độc bản."
      },
      {
        "title": "Miễn phí Cosplay & Đạo cụ",
        "desc": "Mượn trang phục hoá trang quyến rũ, đồ chơi tình yêu và Board Game gắn kết miễn phí."
      },
      {
        "title": "Bảo mật thông tin 100%",
        "desc": "Thủ tục check-in kín đáo, nhận phòng riêng tư, bảo vệ thông tin khách hàng tuyệt đối."
      }
    ],
    "faqs": [
      {
        "question": "Phòng Room - Galaxy có sẵn bồn tắm và máy chiếu không?",
        "answer": "Phòng được trang bị đầy đủ tiện nghi cao cấp theo concept riêng, bao gồm bồn tắm thư giãn, ghế tình yêu Tantra, máy chiếu/Smart TV sắc nét và hệ thống đèn lãng mạn."
      },
      {
        "question": "Tôi có cần đặt cọc trước khi đến nhận phòng không?",
        "answer": "Nếu bạn đến trong vòng 15-20 phút, Mix Hotel sẽ giữ phòng miễn phí không cần cọc. Nếu bạn đặt trước nhiều giờ hoặc qua đêm, vui lòng cọc trước để đảm bảo phòng được giữ 100%."
      },
      {
        "question": "Mix Boutique Hotel có hỗ trợ trang trí tiệc kỷ niệm, sinh nhật không?",
        "answer": "Có! Mix Hotel có 4 gói decor chuyên nghiệp gồm nến, hoa hồng, bong bóng, bánh kem và rượu vang ngoại nhập. Hãy báo trước ít nhất 2-4 tiếng để nhân viên setup hoàn hảo nhất."
      },
      {
        "question": "Khách sạn có cho mượn đồ Cosplay và Board Game tình yêu không?",
        "answer": "Mix Hotel hoàn toàn miễn phí mượn trang phục Cosplay quyến rũ, phụ kiện BDSM tinh tế và bộ Board Game thử thách tình yêu cho tất cả khách hàng lưu trú."
      }
    ],
    "storyHtml": "\n<div class=\"container\">\n<div class=\"content-frame\">\n\n<div class=\"content-body size-1vw data_contents\">\n<p style=\"line-height:1.38; text-align:justify; margin-bottom:13px\">“Nếu tình yêu có một bầu trời riêng, có lẽ nó sẽ trông như thế này.”</p>\n\n<p>Đèn tắt dần.</p>\n\n<p>Những vì sao xuất hiện trên trần nhà, lấp lánh như một dải ngân hà đang chuyển động rất khẽ phía trên hai người.</p>\n\n<p><img alt=\"Không gian phòng Galaxy\" src=\"/storage/9b/7z/9b7zdsk1rong7ncfj76ooknr1ky3_galaxy-1.webp\"></p>\n\n<p>Galaxy được tạo ra cho những cặp đôi yêu sự lãng mạn không cần phô bày. Không gian tối sang trọng, gương âm tường phản chiếu ánh sao dịu nhẹ, khiến căn phòng trở nên sâu hơn, rộng hơn và mơ màng như một giấc mơ điện ảnh.</p>\n\n<p><img alt=\"Hệ thống ánh sáng LED bầu trời sao lung linh\" src=\"/storage/66/u4/66u4cn9elqoc9ewa6y5zmqsttgle_galaxy-2.webp\"></p>\n\n<p>Hãy nằm xuống và nhìn lên trần sao. Trong khoảnh khắc ấy, tiếng xe ngoài phố biến mất, điện thoại không còn quan trọng, và thế giới dường như thu nhỏ lại chỉ còn hai người dưới một bầu trời riêng.</p>\n\n<p><img alt=\"Thiết kế gương lớn kết hợp giường tối ưu trải nghiệm thị giác\" src=\"/storage/7l/l2/7ll2oi290bx0vx13v2721jbytt40_galaxy-3.webp\"></p>\n\n<p>Có những cuộc trò chuyện chỉ nên diễn ra trong ánh sáng dịu như thế. Những lời yêu, những dự định tương lai, những câu chuyện tưởng đã quên từ rất lâu. Galaxy không thúc đẩy cảm xúc bùng nổ; nó khiến cảm xúc lắng xuống và trở nên chân thật hơn.</p>\n\n<p><img alt=\"Những trải nghiệm thăng hoa trong phòng Galaxy\" src=\"/storage/gp/l2/gpl2waih71mbloebf1b7211x2cmn_galaxy-4.webp\"></p>\n\n<p>Không gian này đặc biệt phù hợp cho những buổi hẹn cần sự nhẹ nhàng: kỷ niệm ngày đầu quen nhau, làm lành sau một cuộc giận dỗi, hoặc đơn giản là muốn ở cạnh nhau mà không cần làm gì cả.</p>\n\n<p><img alt=\"Giường King-size êm ái và bộ chăn ga cao cấp\" src=\"/storage/kc/zt/kcztpwetpiez465as14fd3g1e0yo_galaxy-5.webp\"></p>\n\n<p>Khi đêm trôi qua, điều còn đọng lại không phải là sự choáng ngợp.</p>\n\n<p>Mà là cảm giác bình yên hiếm có khi được nằm cạnh người mình yêu, dưới một bầu trời đầy sao chỉ thuộc về hai người.</p>\n\n<p><img alt=\"Smart TV tích hợp Netflix\" src=\"/storage/mv/dd/mvddvzpd4spg6oadq06e70l6qfaa_galaxy-6.webp\"></p>\n\n<p><img alt=\"Tiện nghi phòng tắm hiện đại\" src=\"/storage/es/21/es21b6gyr7b7c31jmfhb191vo8zi_galaxy-7.webp\"></p>\n\n<p><img alt=\"Bộ trò chơi tương tác &quot;tăng nhiệt&quot; cảm xúc\" src=\"/storage/gk/c8/gkc8k19o4al7xltjj1x3rxplf890_galaxy-8.webp\"></p>\n\n<p><img alt=\"Hướng dẫn quy trình đặt phòng Galaxy nhanh chóng\" src=\"/storage/xo/tp/xotp19uxrssvhe3uw0bufio63b4f_galaxy-9.webp\"></p>\n\n</div>\n</div>\n</div>\n"
  },
  "eden": {
    "slug": "eden",
    "name": "VIP Room - Eden",
    "roomType": "VIP",
    "badge": "VIP Suite",
    "branchId": "branch-mix-boutique-premium-hotel",
    "branchName": "Mix Boutique Premium",
    "branchAddress": "Số 8 ngách 29 ngõ 49 Huỳnh Thúc Kháng, phường Láng, Hà Nội",
    "branchPhone": "0383 104 010",
    "branchZalo": "https://zalo.me/0383104010",
    "heroImage": "/storage/6f/g3/6fg32jj8v1f0e9e4gl0ycu6rt38m_203-eden.jpg",
    "heroSubtitle": "Eden là một ốc đảo xanh tươi giữa lòng thành phố, lấy cảm hứng từ khu vườn địa đàng. Căn phòng được bao phủ bởi cây xanh và dây leo giả, tạo cảm giác gần gũi với thiên nhiên, mang lại sự thư thái và tươi mát. Chiếc giường tròn màu trắng tinh khôi ...",
    "youtubeUrl": "",
    "galleryImages": [
      "/storage/6f/g3/6fg32jj8v1f0e9e4gl0ycu6rt38m_203-eden.jpg",
      "/storage/li/iv/liivmurrp1pv9d6xz8agy5vb2l3f_641319225_1208891538084089_709231006040030351_n.webp",
      "/storage/i2/q4/i2q4msbgpjx2ph5q0vo04wg7wp10_828fea62-033d-46d0-867d-ca4d7f2e0fa0.webp"
    ],
    "pricing": {
      "hourly": "400.000 VND/2h",
      "extraHour": "80.000 VND/h",
      "overnight": "750.000 VND",
      "fullDay": "1.200.000 VND"
    },
    "conceptTitle": "Concept Độc Bản: VIP Room - Eden",
    "conceptDesc": "Private concept Master room 01 Đổi gió riêng tư 02 Setup chỉn chu Concept phòng Lạc giữa vườn địa đàng, nơi chỉ còn hai ta . Eden không cần những sắc màu quá táo bạo. Cây xanh, dây leo, ánh đèn mây tre và chiếc giường tròn trắng tạo nên một khoảng riêng nhẹ nhàng, mộc mạc. Bồn tắm gỗ tự nhiên cùng những chi tiết hoài cổ khiến buổi hẹn trở nên thư thái và lãng mạn hơn. Khu vườn địa đàng vào giữa lòng thành phố với sắc xanh phủ quanh Không gian xanh với giường tròn trắng và ánh đèn mây tre ấm áp. Một nơi đủ bình yên để hai người tạm rời phố thị và tận hưởng khoảng thời gian chỉ thuộc về nhau. Nội thất Indochine Chi tiết gỗ, họa tiết và ánh sáng tạo cảm giác boutique, sang hơn một phòng nghỉ thông thường. Ghế S-curve Điểm nhấn trải nghiệm riêng của phòng, được bố trí trong tổng thể kín đáo và có gu. Tiện nghi đủ dùng Điều hòa, WiFi, TV giải trí và các tiện ích cơ bản cho thời gian nghỉ theo giờ hoặc qua đêm. Gọi tư vấn phòng Nhắn Zalo xem ảnh thật",
    "perks": [
      {
        "title": "Bồn tắm sục Jacuzzi đôi",
        "desc": "Không gian thư giãn đẳng cấp với bồn tắm sục lãng mạn, nước nóng ấm áp, bọt xà phòng hoa hồng."
      },
      {
        "title": "Ghế tình yêu Tantra cao cấp",
        "desc": "Đường cong công thái học chuẩn chỉn chu, mang đến cảm xúc thăng hoa bất tận cho cặp đôi."
      },
      {
        "title": "Máy chiếu phim Full HD / 4K",
        "desc": "Màn chiếu siêu rộng xem Netflix, YouTube, chill cùng bộ phim lãng mạn yêu thích."
      },
      {
        "title": "Ánh sáng nghệ thuật Mood Light",
        "desc": "Hệ thống đèn neon, trần ngàn sao và tone màu đa sắc tạo nên không khí quyến rũ độc bản."
      },
      {
        "title": "Miễn phí Cosplay & Đạo cụ",
        "desc": "Mượn trang phục hoá trang quyến rũ, đồ chơi tình yêu và Board Game gắn kết miễn phí."
      },
      {
        "title": "Bảo mật thông tin 100%",
        "desc": "Thủ tục check-in kín đáo, nhận phòng riêng tư, bảo vệ thông tin khách hàng tuyệt đối."
      }
    ],
    "faqs": [
      {
        "question": "Phòng VIP Room - Eden có sẵn bồn tắm và máy chiếu không?",
        "answer": "Phòng được trang bị đầy đủ tiện nghi cao cấp theo concept riêng, bao gồm bồn tắm thư giãn, ghế tình yêu Tantra, máy chiếu/Smart TV sắc nét và hệ thống đèn lãng mạn."
      },
      {
        "question": "Tôi có cần đặt cọc trước khi đến nhận phòng không?",
        "answer": "Nếu bạn đến trong vòng 15-20 phút, Mix Hotel sẽ giữ phòng miễn phí không cần cọc. Nếu bạn đặt trước nhiều giờ hoặc qua đêm, vui lòng cọc trước để đảm bảo phòng được giữ 100%."
      },
      {
        "question": "Mix Boutique Hotel có hỗ trợ trang trí tiệc kỷ niệm, sinh nhật không?",
        "answer": "Có! Mix Hotel có 4 gói decor chuyên nghiệp gồm nến, hoa hồng, bong bóng, bánh kem và rượu vang ngoại nhập. Hãy báo trước ít nhất 2-4 tiếng để nhân viên setup hoàn hảo nhất."
      },
      {
        "question": "Khách sạn có cho mượn đồ Cosplay và Board Game tình yêu không?",
        "answer": "Mix Hotel hoàn toàn miễn phí mượn trang phục Cosplay quyến rũ, phụ kiện BDSM tinh tế và bộ Board Game thử thách tình yêu cho tất cả khách hàng lưu trú."
      }
    ],
    "storyHtml": "\n<div class=\"container\">\n<div class=\"content-frame\">\n\n<div class=\"content-body size-1vw data_contents\">\n<p style=\"line-height:1.38; text-align:justify; margin-bottom:13px\">“Có những nơi không chỉ để ở, mà để chữa lành cho cả hai.”</p>\n\n<p>Khi cánh cửa Eden mở ra, điều đầu tiên chạm vào bạn không phải ánh đèn, mà là màu xanh.</p>\n\n<p><img alt=\"\" src=\"/storage/7n/0s/7n0shoag67f12kss89cai7qr2tnq_641319225_1208891538084089_709231006040030351_n.webp\"></p>\n\n<p>Cây lá hiện diện ở khắp nơi, mềm mại và mát lành như một khu vườn nhiệt đới được giấu kín giữa lòng thành phố. Không gian bỗng trở nên dịu hơn, hơi thở chậm hơn, và mọi căng thẳng của một ngày dài dường như tan đi ngay từ khoảnh khắc đầu tiên.</p>\n\n<p><img alt=\"\" src=\"/storage/pf/8u/pf8uzxlr3elxmlyt10msmwkwpmzh_828fea62-033d-46d0-867d-ca4d7f2e0fa0.webp\"></p>\n\n<p>Bồn tắm gỗ nằm lặng giữa căn phòng như một hồ nước nhỏ trong rừng. Hơi nước ấm, mùi gỗ nhẹ, ánh đèn vàng phản chiếu lên những tán lá – tất cả tạo nên cảm giác đang nghỉ dưỡng ở một resort xa xôi chứ không phải giữa Hà Nội.</p>\n\n<p><img alt=\"\" src=\"/storage/i6/ji/i6ji5e0b3q3muzlox2ax9owphwk8_1.webp\" style=\"width: 800px; height: 600px;\"></p>\n\n<p>Rồi đêm xuống.</p>\n\n<p>Máy chiếu khổ lớn bật lên, biến bức tường thành màn ảnh riêng của hai người. Có thể là một bộ phim yêu thích, một playlist chill, hay đơn giản là để ánh sáng chuyển động trên những mảng xanh xung quanh. Trong Eden, sự lãng mạn không đến từ những điều quá cầu kỳ; nó đến từ cảm giác được thả lỏng hoàn toàn khi ở cạnh người mình yêu.</p>\n\n<p><img alt=\"\" src=\"/storage/gs/4a/gs4a8vc5ewcrdfmbqx9d76hdsndc_2.webp\" style=\"width: 800px; height: 600px;\"></p>\n\n<p>Đây là căn phòng dành cho những cặp đôi muốn trốn khỏi sự ồn ào. Muốn nói chuyện nhiều hơn, ôm nhau lâu hơn, và quên đi đồng hồ đang chạy.</p>\n\n<p>Có những chuyến đi cần máy bay.</p>\n\n<p>Và có những chuyến đi chỉ cần mở cánh cửa Eden.</p>\n\n<p><img alt=\"\" src=\"/storage/63/rt/63rtr4aifxupovmdx7vp7lfg2eeq_3.webp\" style=\"width: 800px; height: 600px;\"></p>\n\n<p>&nbsp;</p>\n\n</div>\n</div>\n</div>\n"
  },
  "lolita": {
    "slug": "lolita",
    "name": "Room - Lolita",
    "roomType": "Deluxe",
    "badge": "Deluxe Suite",
    "branchId": "branch-mix-boutique-premium-hotel",
    "branchName": "Mix Boutique Premium",
    "branchAddress": "Số 8 ngách 29 ngõ 49 Huỳnh Thúc Kháng, phường Láng, Hà Nội",
    "branchPhone": "0383 104 010",
    "branchZalo": "https://zalo.me/0383104010",
    "heroImage": "/storage/wy/79/wy79insca4in9diukw7qq8zdes9l_301-lolita.jpg",
    "heroSubtitle": "Lolita là một không gian lãng mạn và dịu dàng, lấy cảm hứng từ phong cách Lolita ngọt ngào. Căn phòng được bao phủ bởi sắc hồng pastel, từ tường, rèm cửa đến các chi tiết nội thất, tạo nên một bầu không khí mơ mộng và đầy thơ mộng. Trung tâm căn p...",
    "youtubeUrl": "",
    "galleryImages": [
      "/storage/wy/79/wy79insca4in9diukw7qq8zdes9l_301-lolita.jpg",
      "/storage/gh/20/gh20lupls8areb4fspgn1dum6k1l_image.webp",
      "/storage/tz/v7/tzv7zd88rdznv6dq67uvm9x4x5q6_n1w328wwl4l1ycdwoz7w3n9ylq0x_lolita-1.webp"
    ],
    "pricing": {
      "hourly": "300.000 VND/2h",
      "extraHour": "70.000 VND/h",
      "overnight": "600.000 VND",
      "fullDay": "950.000 VND"
    },
    "conceptTitle": "Concept Độc Bản: Room - Lolita",
    "conceptDesc": "Private concept Master room 01 Đổi gió riêng tư 02 Setup chỉn chu Concept phòng Ngọt ngào vừa đủ, lãng mạn theo cách riêng . Lolita mang cảm giác như bước vào một khu vườn cổ tích thu nhỏ. Tông hồng pastel, chiếc giường bốn cọc phủ hoa, ghế tình yêu họa tiết và chiếc gương hình đám mây tạo nên không gian mềm mại, nữ tính để buổi hẹn thêm phần đáng nhớ. Sắc hồng ngọt ngào Không gian lấy hồng pastel làm chủ đạo, kết hợp hoa và những đường nét mềm mại để tạo cảm giác mơ mộng, đáng yêu. Đây là lựa chọn phù hợp cho những cặp đôi thích một buổi hẹn nhẹ nhàng, lãng mạn và có nhiều góc đẹp để lưu lại kỷ niệm. Nội thất Indochine Chi tiết gỗ, họa tiết và ánh sáng tạo cảm giác boutique, sang hơn một phòng nghỉ thông thường. Ghế S-curve Điểm nhấn trải nghiệm riêng của phòng, được bố trí trong tổng thể kín đáo và có gu. Tiện nghi đủ dùng Điều hòa, WiFi, TV giải trí và các tiện ích cơ bản cho thời gian nghỉ theo giờ hoặc qua đêm. Gọi tư vấn phòng Nhắn Zalo xem ảnh thật",
    "perks": [
      {
        "title": "Bồn tắm sục Jacuzzi đôi",
        "desc": "Không gian thư giãn đẳng cấp với bồn tắm sục lãng mạn, nước nóng ấm áp, bọt xà phòng hoa hồng."
      },
      {
        "title": "Ghế tình yêu Tantra cao cấp",
        "desc": "Đường cong công thái học chuẩn chỉn chu, mang đến cảm xúc thăng hoa bất tận cho cặp đôi."
      },
      {
        "title": "Máy chiếu phim Full HD / 4K",
        "desc": "Màn chiếu siêu rộng xem Netflix, YouTube, chill cùng bộ phim lãng mạn yêu thích."
      },
      {
        "title": "Ánh sáng nghệ thuật Mood Light",
        "desc": "Hệ thống đèn neon, trần ngàn sao và tone màu đa sắc tạo nên không khí quyến rũ độc bản."
      },
      {
        "title": "Miễn phí Cosplay & Đạo cụ",
        "desc": "Mượn trang phục hoá trang quyến rũ, đồ chơi tình yêu và Board Game gắn kết miễn phí."
      },
      {
        "title": "Bảo mật thông tin 100%",
        "desc": "Thủ tục check-in kín đáo, nhận phòng riêng tư, bảo vệ thông tin khách hàng tuyệt đối."
      }
    ],
    "faqs": [
      {
        "question": "Phòng Room - Lolita có sẵn bồn tắm và máy chiếu không?",
        "answer": "Phòng được trang bị đầy đủ tiện nghi cao cấp theo concept riêng, bao gồm bồn tắm thư giãn, ghế tình yêu Tantra, máy chiếu/Smart TV sắc nét và hệ thống đèn lãng mạn."
      },
      {
        "question": "Tôi có cần đặt cọc trước khi đến nhận phòng không?",
        "answer": "Nếu bạn đến trong vòng 15-20 phút, Mix Hotel sẽ giữ phòng miễn phí không cần cọc. Nếu bạn đặt trước nhiều giờ hoặc qua đêm, vui lòng cọc trước để đảm bảo phòng được giữ 100%."
      },
      {
        "question": "Mix Boutique Hotel có hỗ trợ trang trí tiệc kỷ niệm, sinh nhật không?",
        "answer": "Có! Mix Hotel có 4 gói decor chuyên nghiệp gồm nến, hoa hồng, bong bóng, bánh kem và rượu vang ngoại nhập. Hãy báo trước ít nhất 2-4 tiếng để nhân viên setup hoàn hảo nhất."
      },
      {
        "question": "Khách sạn có cho mượn đồ Cosplay và Board Game tình yêu không?",
        "answer": "Mix Hotel hoàn toàn miễn phí mượn trang phục Cosplay quyến rũ, phụ kiện BDSM tinh tế và bộ Board Game thử thách tình yêu cho tất cả khách hàng lưu trú."
      }
    ],
    "storyHtml": "\n<div class=\"container\">\n<div class=\"content-frame\">\n\n<div class=\"content-body size-1vw data_contents\">\n<p style=\"line-height:1.38; text-align:justify; margin-bottom:13px\">“Đêm nay, hãy yêu nhau như trong một bộ phim tuổi trẻ.”</p>\n\n<p>Lolita bắt đầu bằng màu hồng pastel rất khẽ, như ánh hoàng hôn cuối ngày còn vương lại trên những đám mây.</p>\n\n<p><img alt=\"Phong cách thiết kế độc bản và đầy mê hoặc tại phòng khách sạn tình yêu Lolita\" src=\"/storage/n1/w3/n1w328wwl4l1ycdwoz7w3n9ylq0x_lolita-1.webp\"></p>\n\n<p>Bước vào căn phòng, bạn sẽ có cảm giác mình vừa đi lạc vào một thế giới khác: trần gương phản chiếu những cụm mây bồng bềnh, ánh sáng mềm mại phủ lên từng góc nhỏ, và mọi thứ đều mang vẻ ngọt ngào đến mức khiến người ta bất giác mỉm cười.</p>\n\n<p><img alt=\"Concept Lolita lấy cảm hứng từ vẻ đẹp cổ điển và hiện đại của Nhật Bản\" src=\"/storage/h1/zu/h1zuf088sczwqe81aawlqakyv44d_lolita-2.webp\"></p>\n\n<p>Chiếc ghế thư giãn bên cạnh góc đọc sách là nơi hoàn hảo cho những cuộc trò chuyện không vội. Một tách trà, vài trang sách, tiếng cười khe khẽ – đôi khi hạnh phúc chỉ cần những điều giản dị như thế.</p>\n\n<p><img alt=\"Tone màu pastel chủ đạo tạo nên cảm giác thư giãn và lãng mạn tuyệt đối\" src=\"/storage/zn/t4/znt4rc6thwb19gth0j6dwwlos7hg_lolita-3.webp\"></p>\n\n<p>Khi màn đêm buông xuống, máy chiếu khổ lớn biến căn phòng thành rạp phim riêng. Hai người cuộn mình trong chăn, xem một bộ phim yêu thích, chia nhau một hộp bánh nhỏ, và cảm giác ấy giống hệt những ngày đầu mới yêu: trong trẻo, hồi hộp và đầy mong chờ.</p>\n\n<p><img alt=\"Decor được chăm chút tỉ mỉ để tạo nên một thế giới cổ tích riêng tư\" src=\"/storage/wr/aj/wraj2ek1972idi18238yxofs4qs9_lolita-4.webp\"></p>\n\n<p>Lolita không cố gắng trở nên quyến rũ theo cách mạnh mẽ. Sức hút của nó nằm ở sự dịu dàng. Ở cảm giác được chăm sóc, được nâng niu, được quay lại với phiên bản trẻ trung và mềm mại nhất của chính mình.</p>\n\n<p><img alt=\"Trải nghiệm tiện nghi trong không gian phòng concept Lolita\" src=\"/storage/fb/9p/fb9pkhf4nc7kgzget3ypzx40md2f_lolita-5.webp\"></p>\n\n<p>Đây là căn phòng dành cho những cặp đôi yêu sự tinh tế, thích chụp những bức ảnh đẹp, và muốn lưu giữ một đêm thật nhẹ nhàng nhưng thật đáng nhớ.</p>\n\n<p><img alt=\"Hệ thống tiện ích hiện đại ẩn mình trong thiết kế cổ điển\" src=\"/storage/zg/oz/zgoz02iy7ixxi34suh37kir316zt_lolita-6.webp\"></p>\n\n<p>Có những nơi khiến tim đập nhanh.</p>\n\n<p>Lolita khiến tim đập êm hơn – và đôi khi, đó mới là điều người ta nhớ lâu nhất.</p>\n\n<p><img alt=\"Góc check-in &quot;sống ảo&quot; chuẩn phong cách công chúa dành cho phái đẹp\" src=\"/storage/5o/q4/5oq4i73khi00ewgorzni99hkr2ww_lolita-7.webp\"></p>\n\n<p><img alt=\"Đảm bảo sự riêng tư và an toàn tuyệt đối cho khách hàng\" src=\"/storage/o7/jv/o7jvvupdh29r0atbdf6fbtcr874z_lolita-8.webp\"></p>\n\n<p><img alt=\"Phòng công chúa Lolita phù hợp với những cặp đôi nào?\" src=\"/storage/aq/w6/aqw684eb04s7urxzow02lg52lny6_lolita-9.webp\"></p>\n\n<p><img alt=\"Hướng dẫn đặt phòng tại Mix Hotel để tận hưởng không gian phòng theme Lolita\" src=\"/storage/0k/vh/0kvhwifpz4h4253xxmsluoc0s0tc_lolita-10.webp\"></p>\n\n</div>\n</div>\n</div>\n"
  },
  "karma": {
    "slug": "karma",
    "name": "Room - Karma",
    "roomType": "Superior",
    "badge": "Superior Suite",
    "branchId": "branch-mix-boutique-premium-hotel",
    "branchName": "Mix Boutique Premium",
    "branchAddress": "Số 8 ngách 29 ngõ 49 Huỳnh Thúc Kháng, phường Láng, Hà Nội",
    "branchPhone": "0383 104 010",
    "branchZalo": "https://zalo.me/0383104010",
    "heroImage": "/storage/e8/fo/e8fo0t2jei3ooib6yy7h4x2zigdc_302-karma.jpg",
    "heroSubtitle": "Karma được thiết kế theo phong cách gợi cảm và huyền bí, với tông màu đỏ nóng bỏng làm chủ đạo. Điểm nhấn độc đáo của căn phòng là những bức tranh Kamasutra được sắp xếp dọc theo bức tường phía đầu giường và trên trần nhà, tạo nên một không gian đ...",
    "youtubeUrl": "",
    "galleryImages": [
      "/storage/e8/fo/e8fo0t2jei3ooib6yy7h4x2zigdc_302-karma.jpg",
      "/storage/ns/e7/nse7li472itq3wab4xxiu4lfup5i_image_(1).webp",
      "/storage/rg/9p/rg9pnmv9cdwv6lndvhjm1furoalg_4tffhpiejoaahapj0eduagvb85k1_karma-1.webp"
    ],
    "pricing": {
      "hourly": "199.000 VND/2h",
      "extraHour": "60.000 VND/h",
      "overnight": "500.000 VND",
      "fullDay": "800.000 VND"
    },
    "conceptTitle": "Concept Độc Bản: Room - Karma",
    "conceptDesc": "Private concept Master room 01 Đổi gió riêng tư 02 Setup chỉn chu Concept phòng Đỏ để khơi cảm xúc, riêng tư để khám phá nhiều hơn . Karma tạo ấn tượng ngay từ sắc đỏ nóng bao phủ không gian, kết hợp giường tròn trắng, ánh đèn ấm và những mảng gương phản chiếu. Những chi tiết nghệ thuật trên tường và trần khiến căn phòng có thêm nét bí ẩn, dành cho những cặp đôi muốn một buổi hẹn táo bạo và khác biệt. Tổng đỏ đen huyền bí Không gian có độ tương phản mạnh, hợp những cặp đôi muốn một buổi hẹn khác nhịp thường ngày. Nội thất Indochine Chi tiết gỗ, họa tiết và ánh sáng tạo cảm giác boutique, sang hơn một phòng nghỉ thông thường. Ghế S-curve Điểm nhấn trải nghiệm riêng của phòng, được bố trí trong tổng thể kín đáo và có gu. Tiện nghi đủ dùng Điều hòa, WiFi, TV giải trí và các tiện ích cơ bản cho thời gian nghỉ theo giờ hoặc qua đêm. Gọi tư vấn phòng Nhắn Zalo xem ảnh thật",
    "perks": [
      {
        "title": "Bồn tắm sục Jacuzzi đôi",
        "desc": "Không gian thư giãn đẳng cấp với bồn tắm sục lãng mạn, nước nóng ấm áp, bọt xà phòng hoa hồng."
      },
      {
        "title": "Ghế tình yêu Tantra cao cấp",
        "desc": "Đường cong công thái học chuẩn chỉn chu, mang đến cảm xúc thăng hoa bất tận cho cặp đôi."
      },
      {
        "title": "Máy chiếu phim Full HD / 4K",
        "desc": "Màn chiếu siêu rộng xem Netflix, YouTube, chill cùng bộ phim lãng mạn yêu thích."
      },
      {
        "title": "Ánh sáng nghệ thuật Mood Light",
        "desc": "Hệ thống đèn neon, trần ngàn sao và tone màu đa sắc tạo nên không khí quyến rũ độc bản."
      },
      {
        "title": "Miễn phí Cosplay & Đạo cụ",
        "desc": "Mượn trang phục hoá trang quyến rũ, đồ chơi tình yêu và Board Game gắn kết miễn phí."
      },
      {
        "title": "Bảo mật thông tin 100%",
        "desc": "Thủ tục check-in kín đáo, nhận phòng riêng tư, bảo vệ thông tin khách hàng tuyệt đối."
      }
    ],
    "faqs": [
      {
        "question": "Phòng Room - Karma có sẵn bồn tắm và máy chiếu không?",
        "answer": "Phòng được trang bị đầy đủ tiện nghi cao cấp theo concept riêng, bao gồm bồn tắm thư giãn, ghế tình yêu Tantra, máy chiếu/Smart TV sắc nét và hệ thống đèn lãng mạn."
      },
      {
        "question": "Tôi có cần đặt cọc trước khi đến nhận phòng không?",
        "answer": "Nếu bạn đến trong vòng 15-20 phút, Mix Hotel sẽ giữ phòng miễn phí không cần cọc. Nếu bạn đặt trước nhiều giờ hoặc qua đêm, vui lòng cọc trước để đảm bảo phòng được giữ 100%."
      },
      {
        "question": "Mix Boutique Hotel có hỗ trợ trang trí tiệc kỷ niệm, sinh nhật không?",
        "answer": "Có! Mix Hotel có 4 gói decor chuyên nghiệp gồm nến, hoa hồng, bong bóng, bánh kem và rượu vang ngoại nhập. Hãy báo trước ít nhất 2-4 tiếng để nhân viên setup hoàn hảo nhất."
      },
      {
        "question": "Khách sạn có cho mượn đồ Cosplay và Board Game tình yêu không?",
        "answer": "Mix Hotel hoàn toàn miễn phí mượn trang phục Cosplay quyến rũ, phụ kiện BDSM tinh tế và bộ Board Game thử thách tình yêu cho tất cả khách hàng lưu trú."
      }
    ],
    "storyHtml": "\n<div class=\"container\">\n<div class=\"content-frame\">\n\n<div class=\"content-body size-1vw data_contents\">\n<p style=\"line-height:1.38; text-align:justify; margin-bottom:13px\">“Nghệ thuật đẹp nhất là nghệ thuật đánh thức cảm xúc.”</p>\n\n<p><img alt=\"Không gian nghệ thuật phòng Karma\" src=\"/storage/4t/ff/4tffhpiejoaahapj0eduagvb85k1_karma-1.webp\"></p>\n\n<p>Karma không giống bất kỳ căn phòng nào khác.</p>\n\n<p>Ngay từ ánh nhìn đầu tiên, sắc đỏ sâu và ánh sáng trầm đã tạo nên một bầu không khí vừa nghệ thuật, vừa bí ẩn, vừa có chút điện ảnh như những thước phim châu Âu về đêm.</p>\n\n<p><img alt=\"Tác phẩm hội họa được sử dụng những gam màu ấm áp tạo nên không gian ấm cúng\" src=\"/storage/nr/lo/nrloq38no0jkc7z4t5i9m09bukmv_karma-3.webp\"></p>\n\n<p>Chiếc giường nhung tròn nằm ở trung tâm căn phòng như một điểm hút thị giác mạnh mẽ. Trần gương mở rộng không gian theo cách đầy mê hoặc, khiến mọi chuyển động đều trở nên mềm mại và cuốn hút hơn. Trên những bức tường, nghệ thuật Kamasutra xuất hiện không phải để phô bày, mà để tạo nên một dấu ấn táo bạo và khác biệt.</p>\n\n<p><img alt=\"Thiết kế gương lớn tăng trải nghiệm thị giác\" src=\"/storage/0w/mv/0wmvhbfi0bxbfswjaqp0ma52jpu9_karma-4.webp\"></p>\n\n<p>Hãy tưởng tượng tiếng nhạc jazz vang nhẹ, ánh đèn đỏ phản chiếu lên chất nhung, và hai người bước chậm giữa không gian như đang ở trong một bộ phim có nhịp điệu rất riêng. Karma không dành cho sự vội vàng; nó dành cho việc tận hưởng từng khoảnh khắc.</p>\n\n<p><img alt=\"Những tiện nghi nổi bật trong phòng khách sạn tình yêu Kamar\" src=\"/storage/zi/v9/ziv9vqmin0jbkhj0nwm40vr4b7gg_karma-5.webp\"></p>\n\n<p>Đây là căn phòng của những cặp đôi thích khám phá, thích cái đẹp có chiều sâu, và thích những trải nghiệm khiến cảm xúc được đẩy lên một cách tinh tế thay vì ồn ào.</p>\n\n<p>Có thể bạn sẽ đến Karma vì sự tò mò.</p>\n\n<p>Nhưng điều khiến người ta muốn quay lại thường là cảm giác khó gọi tên mà căn phòng để lại: vừa quyến rũ, vừa nghệ thuật, vừa khiến đêm ấy trở nên khác hẳn mọi đêm khác.</p>\n\n<p><img alt=\"Giường tròn trung tâm - Điểm nhấn đắt giá nhất của phòng Karma\" src=\"/storage/bh/6u/bh6uoikpe98s1bgdb11xtf8vjq9g_karma-6.webp\"></p>\n\n<p>Karma không chỉ là một chủ đề.</p>\n\n<p>Nó là một trạng thái cảm xúc.</p>\n\n<p><img alt=\"Trang phục cosplay tại phòng tình yêu Kamar\" src=\"/storage/qv/jg/qvjgkzr4g9d1pn19t4pvbuapj5wy_karma-7.webp\"></p>\n\n<p><img alt=\"Phòng tắm Kamar được trang bị đầy đủ vật dụng cùng hệ thống nước nóng lạnh ổn định\" src=\"/storage/um/s7/ums7jgrs06zaelkn97tfcms4ylyf_karma-8.webp\"></p>\n\n<p><img alt=\"Hướng dẫn cách thức đặt phòng Karma\" src=\"/storage/ic/hx/ichxdbq0whqdjb0jsv3qx4q0820o_karma-9.webp\"></p>\n\n</div>\n</div>\n</div>\n"
  },
  "303-scarlet": {
    "slug": "303-scarlet",
    "name": "VIP Room - Scarlet",
    "roomType": "VIP",
    "badge": "VIP Suite",
    "branchId": "branch-mix-boutique-premium-hotel",
    "branchName": "Mix Boutique Premium",
    "branchAddress": "Số 8 ngách 29 ngõ 49 Huỳnh Thúc Kháng, phường Láng, Hà Nội",
    "branchPhone": "0383 104 010",
    "branchZalo": "https://zalo.me/0383104010",
    "heroImage": "/storage/4x/5q/4x5qwkkvxx3pz7350scsvbrt1j9x_303-scarlet.jpg",
    "heroSubtitle": "Scarlet được thiết kế với phong cách mạnh mẽ và táo bạo, kết hợp giữa gam màu đỏ rực rỡ và đen huyền bí. Trung tâm căn phòng là chiếc giường tròn lớn màu đỏ, được đặt trên một bệ nâng lót nhung, tạo cảm giác sang trọng và lôi cuốn. Tường phòng đượ...",
    "youtubeUrl": "",
    "galleryImages": [
      "/storage/4x/5q/4x5qwkkvxx3pz7350scsvbrt1j9x_303-scarlet.jpg",
      "/storage/ui/af/uiafjfjo4new1dbdobiauxkljifp_image_(2).webp",
      "/storage/8v/pu/8vpuu70e0f4mb20dmi5mj1mam0mt_6oxmiieatckx97qg7l6mbss8qjzc_303-scarlet-5.webp"
    ],
    "pricing": {
      "hourly": "400.000 VND/2h",
      "extraHour": "80.000 VND/h",
      "overnight": "750.000 VND",
      "fullDay": "1.200.000 VND"
    },
    "conceptTitle": "Concept Độc Bản: VIP Room - Scarlet",
    "conceptDesc": "Private concept Master room 01 Đổi gió riêng tư 02 Setup chỉn chu Concept phòng Táo bạo để khác biệt, kịch tính để thêm cảm xúc . Scarlet 303 tạo dấu ấn ngay từ sắc đỏ nổi bật kết hợp nền đen huyền bí. Giường tròn phủ nhung, ánh đèn LED đỏ, hệ thống gương và biểu tượng X phát sáng tạo nên không gian có chiều sâu, mạnh về thị giác nhưng vẫn giữ được sự riêng tư cho buổi hẹn. Tông đỏ rực, đen huyền bí Sự tương phản giữa hai gam màu tạo nên vẻ quyến rũ và cá tính, phù hợp với những cặp đôi muốn đổi không khí và trải nghiệm một không gian hẹn hò khác biệt. Nội thất Indochine Chi tiết gỗ, họa tiết và ánh sáng tạo cảm giác boutique, sang hơn một phòng nghỉ thông thường. Ghế S-curve Điểm nhấn trải nghiệm riêng của phòng, được bố trí trong tổng thể kín đáo và có gu. Tiện nghi đủ dùng Điều hòa, WiFi, TV giải trí và các tiện ích cơ bản cho thời gian nghỉ theo giờ hoặc qua đêm. Gọi tư vấn phòng Nhắn Zalo xem ảnh thật",
    "perks": [
      {
        "title": "Bồn tắm sục Jacuzzi đôi",
        "desc": "Không gian thư giãn đẳng cấp với bồn tắm sục lãng mạn, nước nóng ấm áp, bọt xà phòng hoa hồng."
      },
      {
        "title": "Ghế tình yêu Tantra cao cấp",
        "desc": "Đường cong công thái học chuẩn chỉn chu, mang đến cảm xúc thăng hoa bất tận cho cặp đôi."
      },
      {
        "title": "Máy chiếu phim Full HD / 4K",
        "desc": "Màn chiếu siêu rộng xem Netflix, YouTube, chill cùng bộ phim lãng mạn yêu thích."
      },
      {
        "title": "Ánh sáng nghệ thuật Mood Light",
        "desc": "Hệ thống đèn neon, trần ngàn sao và tone màu đa sắc tạo nên không khí quyến rũ độc bản."
      },
      {
        "title": "Miễn phí Cosplay & Đạo cụ",
        "desc": "Mượn trang phục hoá trang quyến rũ, đồ chơi tình yêu và Board Game gắn kết miễn phí."
      },
      {
        "title": "Bảo mật thông tin 100%",
        "desc": "Thủ tục check-in kín đáo, nhận phòng riêng tư, bảo vệ thông tin khách hàng tuyệt đối."
      }
    ],
    "faqs": [
      {
        "question": "Phòng VIP Room - Scarlet có sẵn bồn tắm và máy chiếu không?",
        "answer": "Phòng được trang bị đầy đủ tiện nghi cao cấp theo concept riêng, bao gồm bồn tắm thư giãn, ghế tình yêu Tantra, máy chiếu/Smart TV sắc nét và hệ thống đèn lãng mạn."
      },
      {
        "question": "Tôi có cần đặt cọc trước khi đến nhận phòng không?",
        "answer": "Nếu bạn đến trong vòng 15-20 phút, Mix Hotel sẽ giữ phòng miễn phí không cần cọc. Nếu bạn đặt trước nhiều giờ hoặc qua đêm, vui lòng cọc trước để đảm bảo phòng được giữ 100%."
      },
      {
        "question": "Mix Boutique Hotel có hỗ trợ trang trí tiệc kỷ niệm, sinh nhật không?",
        "answer": "Có! Mix Hotel có 4 gói decor chuyên nghiệp gồm nến, hoa hồng, bong bóng, bánh kem và rượu vang ngoại nhập. Hãy báo trước ít nhất 2-4 tiếng để nhân viên setup hoàn hảo nhất."
      },
      {
        "question": "Khách sạn có cho mượn đồ Cosplay và Board Game tình yêu không?",
        "answer": "Mix Hotel hoàn toàn miễn phí mượn trang phục Cosplay quyến rũ, phụ kiện BDSM tinh tế và bộ Board Game thử thách tình yêu cho tất cả khách hàng lưu trú."
      }
    ],
    "storyHtml": "\n<div class=\"container\">\n<div class=\"content-frame\">\n\n<div class=\"content-body size-1vw data_contents\">\n<p style=\"line-height:1.38; text-align:justify; margin-bottom:13px\">“Đây không phải một đêm bình thường.”</p>\n\n<p>Scarlet được tạo ra cho những khoảnh khắc mà bạn muốn mọi thứ trở nên đặc biệt hơn thường ngày.</p>\n\n<p><img alt=\"Scarlet 303 sở hữu phong cách thiết kế táo bạo khơi dậy mọi giác quan\" src=\"/storage/hk/q3/hkq3dryaiff08v7z2mf4eccptwiv_303-scarlet-1.webp\"></p>\n\n<p>Cánh cửa mở ra, sắc đỏ nhung và đen sang trọng ôm trọn không gian như một khung cảnh trong bộ phim tình cảm cao cấp. Chiếc giường tròn cỡ lớn nằm ở trung tâm căn phòng, vừa quyền lực vừa mềm mại, khiến mọi ánh nhìn đều tự nhiên hướng về đó.</p>\n\n<p><img alt=\"Sự kết hợp hoàn hảo giữa hai gam màu đỏ rực rỡ và đen huyền bí\" src=\"/storage/5q/ip/5qipxs7ljyun51ncvcub4ntmdxbw_303-scarlet-2.webp\"></p>\n\n<p>Ở một góc khác, bồn tắm lấp lánh dưới ánh đèn dịu nhẹ. Hơi nước ấm lan tỏa, tiếng nhạc vang khẽ, và thời gian dường như chậm lại để dành riêng cho hai người. Chiếc ghế tình yêu cùng những chi tiết nội thất được sắp đặt tinh tế khiến căn phòng vừa gợi cảm vừa đẳng cấp, không hề phô trương.</p>\n\n<p><img alt=\"Nghệ thuật sắp đặt nội thất và ánh sáng đầy kịch tính\" src=\"/storage/7d/8q/7d8qwpp1k7s7avs28ox02mnjxhcf_303-scarlet-3.webp\"></p>\n\n<p>Rồi màn đêm thực sự bắt đầu khi máy chiếu khổ lớn sáng lên. Một bộ phim yêu thích, một ly vang, một cái tựa đầu lên vai nhau – những điều tưởng nhỏ bé lại trở thành ký ức rất lớn khi diễn ra trong không gian này.</p>\n\n<p><img alt=\"Biểu tượng chữ X phát sáng và tinh thần phóng khoáng\" src=\"/storage/fk/cb/fkcbwx0emf1d10x083f2g3syp2hb_303-scarlet-4.webp\"></p>\n\n<p>Scarlet đặc biệt phù hợp cho những dịp quan trọng: kỷ niệm ngày yêu, sinh nhật, cầu hôn, tuần trăng mật ngắn, hoặc đơn giản là khi bạn muốn nói với người bên cạnh rằng “hôm nay em/anh là điều quan trọng nhất”.</p>\n\n<p><img alt=\"Hệ thống tiện nghi cao cấp được thiết kế cho những trải nghiệm thăng hoa\" src=\"/storage/6o/xm/6oxmiieatckx97qg7l6mbss8qjzc_303-scarlet-5.webp\"></p>\n\n<p>Có những khách sạn cho bạn một nơi để ngủ.</p>\n\n<p>Scarlet cho bạn một lý do để nhớ mãi đêm ấy: ánh đèn đỏ, tiếng cười vang trong căn phòng rộng, hơi ấm từ bồn tắm, và cảm giác rằng trong khoảnh khắc đó, cả thế giới chỉ còn lại hai người.</p>\n\n<p><img alt=\"Giường tròn lớn màu đỏ\" src=\"/storage/15/ul/15ulgt5478x2xbctrqeqhnq2wsqu_303-scarlet-6.webp\"></p>\n\n<p><img alt=\"Bồn tắm lộ thiên\" src=\"/storage/ij/9z/ij9zuflfe5nqbsuocvinm496k80r_303-scarlet-7.webp\"></p>\n\n<p><img alt=\"Ghế tình yêu (Tantra)\" src=\"/storage/p4/hg/p4hgf701o421o7nifa8mxu75z7xo_303-scarlet-8.webp\"></p>\n\n<p><img alt=\"Máy chiếu phim có Netflix\" src=\"/storage/49/83/4983hj4qokrf82zvb5e7rf5lebts_303-scarlet-9.webp\"></p>\n\n<p><img alt=\"Bộ trò chơi tương tác dành cho cặp đôi\" src=\"/storage/cy/vb/cyvbztkc1mfg1a5650bkxtlhgm08_303-scarlet-10.webp\"></p>\n\n<p><img alt=\"Hướng dẫn đặt phòng tại Mix Hotel\" src=\"/storage/qw/da/qwdaa28tpvd0wqq2lmqfjfj4fvq6_303-scarlet-11.webp\"></p>\n\n</div>\n</div>\n</div>\n"
  },
  "katana": {
    "slug": "katana",
    "name": "VIP Room - Katana",
    "roomType": "VIP",
    "badge": "VIP Suite",
    "branchId": "branch-mix-boutique-premium-hotel",
    "branchName": "Mix Boutique Premium",
    "branchAddress": "Số 8 ngách 29 ngõ 49 Huỳnh Thúc Kháng, phường Láng, Hà Nội",
    "branchPhone": "0383 104 010",
    "branchZalo": "https://zalo.me/0383104010",
    "heroImage": "/storage/q2/a6/q2a6jjsum90li8gzayh55emvp9uw_401-katana.jpg",
    "heroSubtitle": "Katana được thiết kế theo phong cách Nhật Bản truyền thống nhưng cũng không kém phần hiện đại và lãng mạn. Căn phòng lấy tông màu đỏ đậm và đen làm chủ đạo, tạo nên một không gian ấm cúng và gợi cảm. Điểm nhấn là bức tranh Geisha lớn phía đầu giườ...",
    "youtubeUrl": "",
    "galleryImages": [
      "/storage/q2/a6/q2a6jjsum90li8gzayh55emvp9uw_401-katana.jpg",
      "/storage/0f/sh/0fshlfc8mhbgulirx669dykxf563_image_(3).webp",
      "/storage/py/2e/py2e8hhdjufwla5quzwnch7s1zfb_3r8e38225rdl13awoiffcyzh4l58_katana_(7).jpg"
    ],
    "pricing": {
      "hourly": "400.000 VND/2h",
      "extraHour": "80.000 VND/h",
      "overnight": "750.000 VND",
      "fullDay": "1.200.000 VND"
    },
    "conceptTitle": "Concept Độc Bản: VIP Room - Katana",
    "conceptDesc": "Private concept Master room 01 Đổi gió riêng tư 02 Setup chỉn chu Concept phòng Một chút Phù Tang, một chút riêng tư cho hai người . Katana mang tinh thần Nhật Bản vào không gian hẹn hò với sắc đỏ đậm và đen làm chủ đạo. Bức tranh Geisha, đèn lồng đỏ trắng, giường thấp kiểu Nhật cùng những chi tiết gỗ và ánh sáng hiện đại tạo nên cảm giác vừa ấm cúng, vừa lãng mạn và khác biệt. Sắc đỏ Phù Tang Không gian kết hợp đỏ đậm và đen cùng những chi tiết đặc trưng của văn hóa Nhật, tạo độ tương phản vừa đủ để căn phòng có cá tính nhưng vẫn giữ được sự ấm áp và tinh tế. Phù hợp với những cặp đôi muốn đổi gió trong một không gian mang màu sắc Á Đông. Nội thất Indochine Chi tiết gỗ, họa tiết và ánh sáng tạo cảm giác boutique, sang hơn một phòng nghỉ thông thường. Ghế S-curve Điểm nhấn trải nghiệm riêng của phòng, được bố trí trong tổng thể kín đáo và có gu. Tiện nghi đủ dùng Điều hòa, WiFi, TV giải trí và các tiện ích cơ bản cho thời gian nghỉ theo giờ hoặc qua đêm. Gọi tư vấn phòng Nhắn Zalo xem ảnh thật",
    "perks": [
      {
        "title": "Bồn tắm sục Jacuzzi đôi",
        "desc": "Không gian thư giãn đẳng cấp với bồn tắm sục lãng mạn, nước nóng ấm áp, bọt xà phòng hoa hồng."
      },
      {
        "title": "Ghế tình yêu Tantra cao cấp",
        "desc": "Đường cong công thái học chuẩn chỉn chu, mang đến cảm xúc thăng hoa bất tận cho cặp đôi."
      },
      {
        "title": "Máy chiếu phim Full HD / 4K",
        "desc": "Màn chiếu siêu rộng xem Netflix, YouTube, chill cùng bộ phim lãng mạn yêu thích."
      },
      {
        "title": "Ánh sáng nghệ thuật Mood Light",
        "desc": "Hệ thống đèn neon, trần ngàn sao và tone màu đa sắc tạo nên không khí quyến rũ độc bản."
      },
      {
        "title": "Miễn phí Cosplay & Đạo cụ",
        "desc": "Mượn trang phục hoá trang quyến rũ, đồ chơi tình yêu và Board Game gắn kết miễn phí."
      },
      {
        "title": "Bảo mật thông tin 100%",
        "desc": "Thủ tục check-in kín đáo, nhận phòng riêng tư, bảo vệ thông tin khách hàng tuyệt đối."
      }
    ],
    "faqs": [
      {
        "question": "Phòng VIP Room - Katana có sẵn bồn tắm và máy chiếu không?",
        "answer": "Phòng được trang bị đầy đủ tiện nghi cao cấp theo concept riêng, bao gồm bồn tắm thư giãn, ghế tình yêu Tantra, máy chiếu/Smart TV sắc nét và hệ thống đèn lãng mạn."
      },
      {
        "question": "Tôi có cần đặt cọc trước khi đến nhận phòng không?",
        "answer": "Nếu bạn đến trong vòng 15-20 phút, Mix Hotel sẽ giữ phòng miễn phí không cần cọc. Nếu bạn đặt trước nhiều giờ hoặc qua đêm, vui lòng cọc trước để đảm bảo phòng được giữ 100%."
      },
      {
        "question": "Mix Boutique Hotel có hỗ trợ trang trí tiệc kỷ niệm, sinh nhật không?",
        "answer": "Có! Mix Hotel có 4 gói decor chuyên nghiệp gồm nến, hoa hồng, bong bóng, bánh kem và rượu vang ngoại nhập. Hãy báo trước ít nhất 2-4 tiếng để nhân viên setup hoàn hảo nhất."
      },
      {
        "question": "Khách sạn có cho mượn đồ Cosplay và Board Game tình yêu không?",
        "answer": "Mix Hotel hoàn toàn miễn phí mượn trang phục Cosplay quyến rũ, phụ kiện BDSM tinh tế và bộ Board Game thử thách tình yêu cho tất cả khách hàng lưu trú."
      }
    ],
    "storyHtml": "\n<div class=\"container\">\n<div class=\"content-frame\">\n\n<div class=\"content-body size-1vw data_contents\">\n<p style=\"line-height:1.38; text-align:justify; margin-bottom:13px\">“Sự quyến rũ đôi khi nằm ở những điều được giữ lại.”</p>\n\n<p>Katana không ồn ào như Scarlet, không mộng mơ như Galaxy. Nó cuốn hút theo cách rất Nhật Bản: tối giản, tinh tế và đầy chiều sâu.</p>\n\n<p><img src=\"/storage/3r/8e/3r8e38225rdl13awoiffcyzh4l58_katana_(7).jpg\"></p>\n\n<p>Ngay khi bước vào, sắc đỏ ấm kết hợp với những đường nét gọn gàng tạo nên cảm giác cân bằng lạ thường. Không gian rộng rãi nhưng không lạnh lẽo; sang trọng nhưng không phô trương. Mọi chi tiết đều được tiết chế vừa đủ để ánh nhìn có thể nghỉ ngơi và cảm xúc có thể chậm lại.</p>\n\n<p><img src=\"/storage/gx/k6/gxk68s2jel7cv92evus8vrfo451i_katana_(1).jpg\"></p>\n\n<p>Chiếc giường cỡ lớn nằm dưới trần gương, nơi ánh đèn phản chiếu mềm mại như những khung hình điện ảnh. Bồn tắm riêng là khoảng lặng hoàn hảo sau một ngày dài, còn Smart TV hiện đại giúp hai người có thể cùng xem một bộ phim, nghe một bản nhạc hay đơn giản là ở cạnh nhau trong sự yên tĩnh dễ chịu.</p>\n\n<p><img src=\"/storage/op/ce/opcep6loguxdbcioov2o36maege1_katana_(2).jpg\"></p>\n\n<p>Hãy tưởng tượng một đêm mưa nhẹ ngoài phố. Hai người ngâm mình trong làn nước ấm, hơi nước phủ lên mặt gương, tiếng nhạc Nhật vang khẽ, và mọi thứ bên ngoài dường như xa dần.</p>\n\n<p><img src=\"/storage/aq/mo/aqmoee8wto2c17cwp82ec52ixsaf_katana_(3).jpg\"></p>\n\n<p>Katana dành cho những cặp đôi không cần quá nhiều hiệu ứng để cảm thấy đặc biệt. Họ tìm kiếm sự tinh tế, riêng tư và cảm giác được ở bên nhau một cách trọn vẹn nhất.</p>\n\n<p><img src=\"/storage/mt/hx/mthxk7d0ve0v4rhg2czo7b7h6qol_katana_(4).jpg\"></p>\n\n<p>Có những nơi khiến người ta choáng ngợp.</p>\n\n<p>Katana khiến người ta muốn ở lại lâu hơn.</p>\n\n<p>Và đôi khi, đó mới là đẳng cấp thật sự của một không gian dành cho tình yêu.</p>\n\n<p><img src=\"/storage/xg/g7/xgg7hjnp7wafvncnxg0g35xw5r64_katana_(5).jpg\"><img src=\"/storage/la/r4/lar4euemcnou84ezxady6zrhgb55_katana_(6).jpg\"></p>\n\n<p><img src=\"/storage/tj/8j/tj8jcrck23hybc45857e4s6nljrd_katana_(13).jpg\"><img src=\"/storage/75/73/7573mi2om131rtxuaqdla177a8hn_katana_(14).jpg\"><img src=\"/storage/es/g6/esg6bbh4o2vwysl6yhahkseegvo1_katana_(8).jpg\"><img src=\"/storage/ci/xs/cixsi716w1jfne8yeik06p2s7eby_katana_(9).jpg\"><img src=\"/storage/sz/t8/szt8d7t24cwee7m914sfcgtvq1wg_katana_(10).jpg\"></p>\n\n<p><img src=\"/storage/x9/ff/x9ff0xiy98te4wiu9abos4hxiv6c_katana_(11).jpg\"></p>\n\n<p><img src=\"/storage/l2/4l/l24lz4h4tbyz1ouhpxbmpg6kk782_katana_(12).jpg\"></p>\n\n<p><img src=\"/storage/eq/ai/eqai3k12ud3sinwlqy1hthjfhs68_katana_(21).jpg\"><img src=\"/storage/ch/hj/chhjwgrax869yd4q6vif1mnngmpq_katana_(15).jpg\"><img src=\"/storage/j7/9j/j79j9xzlp8ywmh4ddxyjytvnbq5o_katana_(16).jpg\"><img src=\"/storage/w7/ga/w7gar2vbt4j7fkwj41e7ehxw0gnz_katana_(17).jpg\"><img src=\"/storage/q7/pl/q7plmtjldsq2grzvnt9beupkvu9m_katana_(18).jpg\"><img src=\"/storage/cc/jj/ccjj6z8pis24p2hqm2tl1hi0ec6l_katana_(19).jpg\"><img src=\"/storage/23/z3/23z3pc9nkez76akl8tbxqn4lr2r0_katana_(20).jpg\"></p>\n\n</div>\n</div>\n</div>\n"
  },
  "amora": {
    "slug": "amora",
    "name": "Room - Amora",
    "roomType": "Deluxe",
    "badge": "Deluxe Suite",
    "branchId": "branch-mix-boutique-premium-hotel",
    "branchName": "Mix Boutique Premium",
    "branchAddress": "Số 8 ngách 29 ngõ 49 Huỳnh Thúc Kháng, phường Láng, Hà Nội",
    "branchPhone": "0383 104 010",
    "branchZalo": "https://zalo.me/0383104010",
    "heroImage": "/storage/1e/ak/1eakhk4fdk9spyiu1er2dch50zd7_402-amora.jpg",
    "heroSubtitle": "Amora mang đến một không gian lãng mạn và gần gũi với thiên nhiên. Căn phòng được thiết kế theo phong cách ấm áp, với trần nhà bằng gỗ và những dây đèn lấp lánh như bầu trời sao, tạo cảm giác thư giãn và mơ mộng. Điểm độc đáo của phòng là chiếc cử...",
    "youtubeUrl": "",
    "galleryImages": [
      "/storage/1e/ak/1eakhk4fdk9spyiu1er2dch50zd7_402-amora.jpg",
      "/storage/7t/gf/7tgf82c7inahko34xg79ysi2zinc_image_(4).webp",
      "/storage/ga/aq/gaaq0jly7hci0se2vfmoollb6ueq_2g49rcjn4g8csv4p3uwyaxldomum_amora-2.webp"
    ],
    "pricing": {
      "hourly": "300.000 VND/2h",
      "extraHour": "70.000 VND/h",
      "overnight": "600.000 VND",
      "fullDay": "950.000 VND"
    },
    "conceptTitle": "Concept Độc Bản: Room - Amora",
    "conceptDesc": "Private concept Master room 01 Đổi gió riêng tư 02 Setup chỉn chu Concept phòng Một khoảng trời riêng, dịu dàng cho những phút bên nhau . Amora mang thiên nhiên vào không gian riêng tư với trần gỗ ấm, những dây đèn lấp lánh như bầu trời sao và khung cửa kính nhìn ra khu vườn nhỏ. Tổng thể tối giản, nhẹ nhàng, tạo cảm giác thư giãn và gần gũi cho một buổi hẹn chỉ dành cho hai người. Ấm áp giữa khoảng xanh Sự kết hợp giữa gỗ tự nhiên, ánh đèn lấp lánh và cây xanh tạo nên một không gian nhẹ nhàng, thoáng đãng. Amora phù hợp với những cặp đôi muốn đổi gió nhưng vẫn yêu thích cảm giác riêng tư, thư thái và không quá cầu kỳ. Nội thất Indochine Chi tiết gỗ, họa tiết và ánh sáng tạo cảm giác boutique, sang hơn một phòng nghỉ thông thường. Ghế S-curve Điểm nhấn trải nghiệm riêng của phòng, được bố trí trong tổng thể kín đáo và có gu. Tiện nghi đủ dùng Điều hòa, WiFi, TV giải trí và các tiện ích cơ bản cho thời gian nghỉ theo giờ hoặc qua đêm. Gọi tư vấn phòng Nhắn Zalo xem ảnh thật",
    "perks": [
      {
        "title": "Bồn tắm sục Jacuzzi đôi",
        "desc": "Không gian thư giãn đẳng cấp với bồn tắm sục lãng mạn, nước nóng ấm áp, bọt xà phòng hoa hồng."
      },
      {
        "title": "Ghế tình yêu Tantra cao cấp",
        "desc": "Đường cong công thái học chuẩn chỉn chu, mang đến cảm xúc thăng hoa bất tận cho cặp đôi."
      },
      {
        "title": "Máy chiếu phim Full HD / 4K",
        "desc": "Màn chiếu siêu rộng xem Netflix, YouTube, chill cùng bộ phim lãng mạn yêu thích."
      },
      {
        "title": "Ánh sáng nghệ thuật Mood Light",
        "desc": "Hệ thống đèn neon, trần ngàn sao và tone màu đa sắc tạo nên không khí quyến rũ độc bản."
      },
      {
        "title": "Miễn phí Cosplay & Đạo cụ",
        "desc": "Mượn trang phục hoá trang quyến rũ, đồ chơi tình yêu và Board Game gắn kết miễn phí."
      },
      {
        "title": "Bảo mật thông tin 100%",
        "desc": "Thủ tục check-in kín đáo, nhận phòng riêng tư, bảo vệ thông tin khách hàng tuyệt đối."
      }
    ],
    "faqs": [
      {
        "question": "Phòng Room - Amora có sẵn bồn tắm và máy chiếu không?",
        "answer": "Phòng được trang bị đầy đủ tiện nghi cao cấp theo concept riêng, bao gồm bồn tắm thư giãn, ghế tình yêu Tantra, máy chiếu/Smart TV sắc nét và hệ thống đèn lãng mạn."
      },
      {
        "question": "Tôi có cần đặt cọc trước khi đến nhận phòng không?",
        "answer": "Nếu bạn đến trong vòng 15-20 phút, Mix Hotel sẽ giữ phòng miễn phí không cần cọc. Nếu bạn đặt trước nhiều giờ hoặc qua đêm, vui lòng cọc trước để đảm bảo phòng được giữ 100%."
      },
      {
        "question": "Mix Boutique Hotel có hỗ trợ trang trí tiệc kỷ niệm, sinh nhật không?",
        "answer": "Có! Mix Hotel có 4 gói decor chuyên nghiệp gồm nến, hoa hồng, bong bóng, bánh kem và rượu vang ngoại nhập. Hãy báo trước ít nhất 2-4 tiếng để nhân viên setup hoàn hảo nhất."
      },
      {
        "question": "Khách sạn có cho mượn đồ Cosplay và Board Game tình yêu không?",
        "answer": "Mix Hotel hoàn toàn miễn phí mượn trang phục Cosplay quyến rũ, phụ kiện BDSM tinh tế và bộ Board Game thử thách tình yêu cho tất cả khách hàng lưu trú."
      }
    ],
    "storyHtml": "\n<div class=\"container\">\n<div class=\"content-frame\">\n\n<div class=\"content-body size-1vw data_contents\">\n<p style=\"line-height:1.38; text-align:justify; margin-bottom:13px\">“Một nơi để yêu nhau thật chậm.”</p>\n\n<p>Amora giống như một căn nhà gỗ được giấu kín khỏi thế giới.</p>\n\n<p><img alt=\"Không gian phòng Amora tại Mix Hotel: Sự khác biệt giữa &quot;tinh tế&quot; và &quot;quảng cáo&quot;\" src=\"/storage/jh/1x/jh1x3awf47z9vbzxngp3867vu269_amora-1.webp\"></p>\n\n<p>Mùi gỗ ấm áp, ánh sáng tự nhiên từ giếng trời và những mảng đá tự nhiên nơi khu vực vệ sinh tạo nên cảm giác gần gũi đến mức bạn quên rằng mình đang ở trong một khách sạn. Không gian này không cố gắng trở nên xa hoa; nó khiến người ta cảm thấy được ôm lấy.</p>\n\n<p><img alt=\"Phòng khách sạn tình yêu Amora được thiết kế để &quot;thăng hoa cảm xúc&quot;\" src=\"/storage/2g/49/2g49rcjn4g8csv4p3uwyaxldomum_amora-2.webp\"></p>\n\n<p>Chiếc bồn tắm gỗ tròn là trái tim của Amora. Khi làn nước ấm đầy lên, ánh đèn vàng phản chiếu trên mặt gỗ và hơi nước lan nhẹ trong không gian, mọi mệt mỏi dường như tan ra từng chút một.</p>\n\n<p><img alt=\"Kiến trúc và bối cảnh phòng Amora\" src=\"/storage/91/ao/91ao26m6g1dr07kdu8m3pr3k0wmy_amora-3.webp\"></p>\n\n<p>Buổi sáng, ánh nắng từ giếng trời rơi xuống nền phòng như một cảnh phim mùa hè. Buổi tối, căn phòng trở nên ấm cúng như một căn cabin riêng chỉ dành cho hai người. Không cần kế hoạch cầu kỳ, không cần trang phục đặc biệt, chỉ cần ở cạnh nhau và để thời gian trôi chậm hơn bình thường.</p>\n\n<p><img alt=\"Phòng được trang bị hệ thống cách âm kỹ lưỡng\" src=\"/storage/bs/yh/bsyh0w9fbt1cxzuqek8m4bs4tzub_amora-4.webp\"></p>\n\n<p>Amora đặc biệt phù hợp cho những cặp đôi muốn “trốn” khỏi nhịp sống nhanh: sau một tuần làm việc mệt mỏi, sau những ngày căng thẳng, hoặc đơn giản là khi cả hai cần một khoảng lặng để kết nối lại với nhau.</p>\n\n<p><img alt=\"Mix Hotel rất chú trọng về tiêu chuẩn vệ sinh khắt khe\" src=\"/storage/m7/dp/m7dpd0eqc5dwxjir5dxxy85yfofx_amora-5.webp\"></p>\n\n<p>Có những chuyến đi khiến người ta hào hứng.</p>\n\n<p>Amora khiến người ta dịu lại.</p>\n\n<p>Và đôi khi, điều lãng mạn nhất không phải là những điều quá lớn lao, mà là cảm giác được ở bên người mình yêu trong một không gian ấm áp, bình yên và hoàn toàn thuộc về hai người.</p>\n\n<p><img alt=\"Tiện ích đi kèm phòng Amora\" src=\"/storage/1e/u1/1eu1sgweprjuvgs0sg5dfuigi4xz_amora-6.webp\"></p>\n\n<p><img alt=\"Cách đặt phòng minh bạch, không lo phát sinh\" src=\"/storage/i1/68/i1681hg8jgru7ammtyre5fnlzeb4_amora-7.webp\"></p>\n\n<p><img alt=\"Cách đặt phòng minh bạch, không lo phát sinh\" src=\"/storage/4y/g1/4yg1o4hox38mxt1d2eah7p2fgdlf_amora-8.webp\"></p>\n\n<p><img alt=\"Cách đặt phòng minh bạch, không lo phát sinh\" src=\"/storage/4u/u1/4uu1c063kf3y6yfbvzo2es03tl2s_amora-9.webp\"></p>\n\n</div>\n</div>\n</div>\n"
  },
  "cloud-nine": {
    "slug": "cloud-nine",
    "name": "VIP Room - Cloud Nine",
    "roomType": "VIP",
    "badge": "VIP Suite",
    "branchId": "branch-mix-boutique-premium-hotel",
    "branchName": "Mix Boutique Premium",
    "branchAddress": "Số 8 ngách 29 ngõ 49 Huỳnh Thúc Kháng, phường Láng, Hà Nội",
    "branchPhone": "0383 104 010",
    "branchZalo": "https://zalo.me/0383104010",
    "heroImage": "/storage/qf/ci/qfcivbquyw6bbxs9vjeufbti5k4t_469-moonlit-love.jpg",
    "heroSubtitle": "Cloud Nine mang đến một không gian lãng mạn và hiện đại, lấy cảm hứng từ bầu trời đêm đầy sao. Căn phòng được thiết kế với trần nhà ốp gỗ và trang trí bằng hàng trăm chiếc đèn nhỏ lấp lánh, tạo cảm giác như đang nằm dưới dải ngân hà. Điểm đặc biệt...",
    "youtubeUrl": "",
    "galleryImages": [
      "/storage/qf/ci/qfcivbquyw6bbxs9vjeufbti5k4t_469-moonlit-love.jpg",
      "/storage/3s/z7/3sz7xg8qjbc60enfy41dttp7c9il_PMC_90_(8)_(1).webp",
      "/storage/l2/bv/l2bvumn3ffzt4erivwdkwqe8cf0e_PMC_90_(8).webp",
      "/storage/40/3m/403mcfovounrplfnelhr6f77l3zi_xrh8ev6x79vb67mh6ex5ldimuwd0_moonlit-love_(23).jpg"
    ],
    "pricing": {
      "hourly": "400.000 VND/2h",
      "extraHour": "80.000 VND/h",
      "overnight": "750.000 VND",
      "fullDay": "1.200.000 VND"
    },
    "conceptTitle": "Concept Độc Bản: VIP Room - Cloud Nine",
    "conceptDesc": "Private concept Master room 01 Đổi gió riêng tư 02 Setup chỉn chu Concept phòng Lên mây giữa trời sao, chạm gần hơn những rung động . Cloud Nine tái hiện một khoảng trời riêng dành cho hai người. Hàng trăm ánh đèn lấp lánh trên trần, bồn tắm mở đầy thư giãn và màn hình chiếu rộng biến buổi hẹn thành một thước phim chỉ thuộc về hai bạn. Ánh sáng lấp lánh lãng mạn Không gian bầu trời đêm vào không gian riêng với những ánh đèn lấp lánh, bồn tắm thư giãn và màn chiếu rộng. Một căn phòng dành cho những buổi hẹn nhẹ nhàng, lãng mạn và thật khó quên. Nội thất Indochine Chi tiết gỗ, họa tiết và ánh sáng tạo cảm giác boutique, sang hơn một phòng nghỉ thông thường. Ghế S-curve Điểm nhấn trải nghiệm riêng của phòng, được bố trí trong tổng thể kín đáo và có gu. Tiện nghi đủ dùng Điều hòa, WiFi, TV giải trí và các tiện ích cơ bản cho thời gian nghỉ theo giờ hoặc qua đêm. Gọi tư vấn phòng Nhắn Zalo xem ảnh thật",
    "perks": [
      {
        "title": "Bồn tắm sục Jacuzzi đôi",
        "desc": "Không gian thư giãn đẳng cấp với bồn tắm sục lãng mạn, nước nóng ấm áp, bọt xà phòng hoa hồng."
      },
      {
        "title": "Ghế tình yêu Tantra cao cấp",
        "desc": "Đường cong công thái học chuẩn chỉn chu, mang đến cảm xúc thăng hoa bất tận cho cặp đôi."
      },
      {
        "title": "Máy chiếu phim Full HD / 4K",
        "desc": "Màn chiếu siêu rộng xem Netflix, YouTube, chill cùng bộ phim lãng mạn yêu thích."
      },
      {
        "title": "Ánh sáng nghệ thuật Mood Light",
        "desc": "Hệ thống đèn neon, trần ngàn sao và tone màu đa sắc tạo nên không khí quyến rũ độc bản."
      },
      {
        "title": "Miễn phí Cosplay & Đạo cụ",
        "desc": "Mượn trang phục hoá trang quyến rũ, đồ chơi tình yêu và Board Game gắn kết miễn phí."
      },
      {
        "title": "Bảo mật thông tin 100%",
        "desc": "Thủ tục check-in kín đáo, nhận phòng riêng tư, bảo vệ thông tin khách hàng tuyệt đối."
      }
    ],
    "faqs": [
      {
        "question": "Phòng VIP Room - Cloud Nine có sẵn bồn tắm và máy chiếu không?",
        "answer": "Phòng được trang bị đầy đủ tiện nghi cao cấp theo concept riêng, bao gồm bồn tắm thư giãn, ghế tình yêu Tantra, máy chiếu/Smart TV sắc nét và hệ thống đèn lãng mạn."
      },
      {
        "question": "Tôi có cần đặt cọc trước khi đến nhận phòng không?",
        "answer": "Nếu bạn đến trong vòng 15-20 phút, Mix Hotel sẽ giữ phòng miễn phí không cần cọc. Nếu bạn đặt trước nhiều giờ hoặc qua đêm, vui lòng cọc trước để đảm bảo phòng được giữ 100%."
      },
      {
        "question": "Mix Boutique Hotel có hỗ trợ trang trí tiệc kỷ niệm, sinh nhật không?",
        "answer": "Có! Mix Hotel có 4 gói decor chuyên nghiệp gồm nến, hoa hồng, bong bóng, bánh kem và rượu vang ngoại nhập. Hãy báo trước ít nhất 2-4 tiếng để nhân viên setup hoàn hảo nhất."
      },
      {
        "question": "Khách sạn có cho mượn đồ Cosplay và Board Game tình yêu không?",
        "answer": "Mix Hotel hoàn toàn miễn phí mượn trang phục Cosplay quyến rũ, phụ kiện BDSM tinh tế và bộ Board Game thử thách tình yêu cho tất cả khách hàng lưu trú."
      }
    ],
    "storyHtml": "\n<div class=\"container\">\n<div class=\"content-frame\">\n\n<div class=\"content-body size-1vw data_contents\">\n<p style=\"line-height:1.38; text-align:justify; margin-bottom:13px\">“Đêm nay, hãy để thế giới ở lại phía dưới.”</p>\n\n<p>Cloud Nine là căn phòng được sinh ra để trở thành đoạn kết đẹp nhất của một câu chuyện tình.</p>\n\n<p><img src=\"/storage/85/1b/851bsag069aaijhxc1ty53yxjgfs_moonlit-love_(7).jpg\">Nằm trên tầng áp mái với những đường mái chéo đặc trưng, căn phòng mở ra như một thước phim châu Âu giữa đêm hè. Toàn bộ không gian được ốp gỗ, tạo nên cảm giác ấm áp, sang trọng và riêng tư đến mức bạn có cảm giác mình đang ở trong một căn chalet trên núi, nơi chỉ có ánh đèn vàng và hơi thở của hai người.</p>\n\n<p><img src=\"/storage/rz/zb/rzzbszhlllqtdk2aseciyp4msr1l_moonlit-love_(1).jpg\"></p>\n\n<p>Buổi chiều, ánh nắng len qua ô cửa, chạm lên từng thớ gỗ và góc đọc sách nhỏ bên cửa sổ. Mọi thứ yên tĩnh đến mức nghe rõ tiếng lật trang sách và tiếng cười khẽ của người bên cạnh.</p>\n\n<p>Khi đêm xuống, Cloud Nine thực sự bắt đầu.</p>\n\n<p>Bồn tắm lớn đầy nước ấm, màn chiếu khổ lớn sáng lên, một bộ phim yêu thích chạy chậm trong nền, và hai người cuộn mình trong không gian áp mái đầy cảm xúc. Không còn tiếng xe, không còn lịch làm việc, không còn những thông báo từ điện thoại. Chỉ còn lại cảm giác được nghỉ ngơi, được yêu thương và được ở cạnh nhau mà không cần vội vàng.</p>\n\n<p><img src=\"/storage/xw/8p/xw8pf29nmezywo6lxb7odoicnfqf_moonlit-love_(19).jpg\"></p>\n\n<p>Có những căn phòng đẹp để chụp ảnh.</p>\n\n<p>Cloud Nine đẹp để sống trong khoảnh khắc ấy.</p>\n\n<p>Nó dành cho những dịp thật đặc biệt: kỷ niệm nhiều năm bên nhau, tuần trăng mật, cầu hôn, hoặc đơn giản là khi bạn muốn tặng người mình yêu một đêm đáng nhớ hơn mọi món quà.</p>\n\n<p><img src=\"/storage/qp/rn/qprnc9o9ltvk6yq0ky4d6m1g0x73_moonlit-love_(3).jpg\"></p>\n\n<p>Và rồi, khi rời khỏi căn phòng vào sáng hôm sau, điều còn ở lại không chỉ là những bức ảnh hay một giấc ngủ ngon.</p>\n\n<p>Mà là cảm giác rất khó gọi tên – cảm giác như trong vài giờ ngắn ngủi ấy, hai người đã tạm rời khỏi thế giới và ở cùng nhau trên “chín tầng mây”.</p>\n\n<p><img src=\"/storage/6f/ja/6fjaj0y8wlq22bfjve5uow5urkmc_moonlit-love_(2).jpg\"></p>\n\n<p><img src=\"/storage/zd/6c/zd6c0xq0swbhm97j9a0ks74e9fj7_moonlit-love_(4).jpg\"></p>\n\n<p><img src=\"/storage/79/6u/796ujxnh0sz4jos4uy2ddha1dyzl_moonlit-love_(5).jpg\"><img src=\"/storage/st/0u/st0uart7rdp2vsdi4o85xcd3jon5_moonlit-love_(6).jpg\"></p>\n\n<p><img src=\"/storage/bc/1d/bc1d74gzo0vdce94jdzq0w311caj_moonlit-love_(8).jpg\"><img src=\"/storage/5a/l4/5al4o15sneqii1zm5mmmfr0r5tfq_moonlit-love_(9).jpg\"><img src=\"/storage/5u/mf/5umfqy86lz9lyyeyw3zj0mrmrga1_moonlit-love_(10).jpg\"><img src=\"/storage/do/xb/doxb4tob2829hr546avxwdef5bof_moonlit-love_(11).jpg\"><img src=\"/storage/bh/e4/bhe48qs6bysd36bb6syk6egagjtm_moonlit-love_(12).jpg\"></p>\n\n<p><img src=\"/storage/1h/38/1h38on65cuhm249gp7niddw4xo32_moonlit-love_(13).jpg\"><img src=\"/storage/h9/xt/h9xt36qok0d6l5kjdoilv98ut0g6_moonlit-love_(14).jpg\"></p>\n\n<p><img src=\"/storage/fm/xd/fmxdpusq7udtjfh1y00sgbu2yion_moonlit-love_(24).jpg\"><img src=\"/storage/74/7r/747r8oa9gia6ufsspxx795qfkb4o_moonlit-love_(15).jpg\"></p>\n\n<p><img src=\"/storage/if/2v/if2vcqrt8uet4sc0k5iy75ed2gzz_moonlit-love_(17).jpg\"><img src=\"/storage/0k/xz/0kxzsj7uwp9f4o9bvtdgrsm1buyg_moonlit-love_(18).jpg\"><img src=\"/storage/1m/h9/1mh9301eeuf9xippnpr2le84z154_moonlit-love_(20).jpg\"><img src=\"/storage/7l/8v/7l8vcof6pb8o4xmb4ldvqa2f73w3_moonlit-love_(21).jpg\"><img src=\"/storage/gp/tw/gptwyyf1heff2saum85iqvqthtpk_moonlit-love_(22).jpg\"><img src=\"/storage/xr/h8/xrh8ev6x79vb67mh6ex5ldimuwd0_moonlit-love_(23).jpg\"></p>\n\n</div>\n</div>\n</div>\n"
  },
  "hidden-frenzy": {
    "slug": "hidden-frenzy",
    "name": "Room - Hidden Frenzy",
    "roomType": "Superior",
    "badge": "Superior Suite",
    "branchId": "branch-mix-boutique-hotel-256b-dang-tien-dong",
    "branchName": "Mix Boutique Hotel 256B Đặng Tiến Đông",
    "branchAddress": "256B Đặng Tiến Đông, Chợ Dừa, Đống Đa, Hà Nội",
    "branchPhone": "0383 104 010",
    "branchZalo": "https://zalo.me/0383104010",
    "heroImage": "/uploads/images/600ac2278a159118a146eab7/hidden-frenzy__2_.webp",
    "heroSubtitle": "Rực rỡ và nóng bỏng là cảm giác đầu tiên khi đặt chân vào căn phòng Hidden Frenzy. Sự khoải cảm sẽ bùng cháy với những cảm xúc thăng hoa mà căn phòng đầy thú vị này manh đến. Với giường tròn King Size và ghế tình yêu là nơi chứ đựng sự đê mê và kh...",
    "youtubeUrl": "",
    "galleryImages": [
      "/uploads/images/600ac2278a159118a146eab7/hidden-frenzy__2_.webp",
      "/uploads/images/62c55c90d6a5eb3785f6ee8e/hidden-frenzy__1_.webp",
      "/uploads/images/62c55c90d6a5eb3785f6ee8f/hidden-frenzy__2_.webp",
      "/uploads/images/62c55c90d6a5eb3785f6ee90/hidden-frenzy__3_.webp",
      "/uploads/images/62c55c90d6a5eb3785f6ee91/hidden-frenzy__4_.webp",
      "/uploads/images/62c55c90d6a5eb3785f6ee92/hidden-frenzy__5_.webp",
      "/uploads/images/62c55c90d6a5eb3785f6ee93/hidden-frenzy__6_.webp",
      "/storage/6w/5d/6w5dwzyn557madseovvf1qtlfjhv_hidden-frenzy__1_.webp",
      "/storage/ju/7i/ju7i5e2g8exy7cjdonflqewf48hi_hidden-frenzy__2_.webp"
    ],
    "pricing": {
      "hourly": "199.000 VND/2h",
      "extraHour": "60.000 VND/h",
      "overnight": "500.000 VND",
      "fullDay": "800.000 VND"
    },
    "conceptTitle": "Concept Độc Bản: Room - Hidden Frenzy",
    "conceptDesc": "Private concept Master room 01 Đổi gió riêng tư 02 Setup chỉn chu Concept phòng Đủ nóng để bùng cháy, đủ riêng tư để thả mình vào cuộc hẹn . Hidden Frenzy tạo ấn tượng ngay từ sắc đỏ nổi bật và không gian đầy năng lượng. Giường tròn King Size, ghế tình yêu, gương áp trần cùng ánh sáng có chiều sâu tạo nên một căn phòng táo bạo, dành cho những cặp đôi muốn đổi gió và trải nghiệm một buổi hẹn khác biệt. Sắc đỏ tím rực rỡ Tông đỏ tím chủ đạo kết hợp cùng ánh sáng và những chi tiết nội thất đặc trưng tạo nên cảm giác nóng bỏng, cuốn hút. Không gian phù hợp với những cặp đôi muốn một buổi hẹn nhiều cảm xúc, mới lạ và không theo lối quen thuộc. Nội thất Indochine Chi tiết gỗ, họa tiết và ánh sáng tạo cảm giác boutique, sang hơn một phòng nghỉ thông thường. Ghế S-curve Điểm nhấn trải nghiệm riêng của phòng, được bố trí trong tổng thể kín đáo và có gu. Tiện nghi đủ dùng Điều hòa, WiFi, TV giải trí và các tiện ích cơ bản cho thời gian nghỉ theo giờ hoặc qua đêm. Gọi tư vấn phòng Nhắn Zalo xem ảnh thật",
    "perks": [
      {
        "title": "Bồn tắm sục Jacuzzi đôi",
        "desc": "Không gian thư giãn đẳng cấp với bồn tắm sục lãng mạn, nước nóng ấm áp, bọt xà phòng hoa hồng."
      },
      {
        "title": "Ghế tình yêu Tantra cao cấp",
        "desc": "Đường cong công thái học chuẩn chỉn chu, mang đến cảm xúc thăng hoa bất tận cho cặp đôi."
      },
      {
        "title": "Máy chiếu phim Full HD / 4K",
        "desc": "Màn chiếu siêu rộng xem Netflix, YouTube, chill cùng bộ phim lãng mạn yêu thích."
      },
      {
        "title": "Ánh sáng nghệ thuật Mood Light",
        "desc": "Hệ thống đèn neon, trần ngàn sao và tone màu đa sắc tạo nên không khí quyến rũ độc bản."
      },
      {
        "title": "Miễn phí Cosplay & Đạo cụ",
        "desc": "Mượn trang phục hoá trang quyến rũ, đồ chơi tình yêu và Board Game gắn kết miễn phí."
      },
      {
        "title": "Bảo mật thông tin 100%",
        "desc": "Thủ tục check-in kín đáo, nhận phòng riêng tư, bảo vệ thông tin khách hàng tuyệt đối."
      }
    ],
    "faqs": [
      {
        "question": "Phòng Room - Hidden Frenzy có sẵn bồn tắm và máy chiếu không?",
        "answer": "Phòng được trang bị đầy đủ tiện nghi cao cấp theo concept riêng, bao gồm bồn tắm thư giãn, ghế tình yêu Tantra, máy chiếu/Smart TV sắc nét và hệ thống đèn lãng mạn."
      },
      {
        "question": "Tôi có cần đặt cọc trước khi đến nhận phòng không?",
        "answer": "Nếu bạn đến trong vòng 15-20 phút, Mix Hotel sẽ giữ phòng miễn phí không cần cọc. Nếu bạn đặt trước nhiều giờ hoặc qua đêm, vui lòng cọc trước để đảm bảo phòng được giữ 100%."
      },
      {
        "question": "Mix Boutique Hotel có hỗ trợ trang trí tiệc kỷ niệm, sinh nhật không?",
        "answer": "Có! Mix Hotel có 4 gói decor chuyên nghiệp gồm nến, hoa hồng, bong bóng, bánh kem và rượu vang ngoại nhập. Hãy báo trước ít nhất 2-4 tiếng để nhân viên setup hoàn hảo nhất."
      },
      {
        "question": "Khách sạn có cho mượn đồ Cosplay và Board Game tình yêu không?",
        "answer": "Mix Hotel hoàn toàn miễn phí mượn trang phục Cosplay quyến rũ, phụ kiện BDSM tinh tế và bộ Board Game thử thách tình yêu cho tất cả khách hàng lưu trú."
      }
    ],
    "storyHtml": "\n<div class=\"container\">\n<div class=\"content-frame\">\n\n<div class=\"content-body size-1vw data_contents\">\n<p style=\"line-height:1.38; text-align:justify; margin-bottom:13px\">“Có những cảm xúc chỉ nên được đánh thức trong bí mật.”</p>\n\n<p>Hidden Frenzy bắt đầu bằng bóng tối.</p>\n\n<p><img src=\"https://mixhotel.vn/uploads/images/62c55c90d6a5eb3785f6ee8e/hidden-frenzy__1_.webp\"></p>\n\n<p>Không gian chìm trong những gam tím, hồng và đen sâu thẳm như một câu lạc bộ bí mật chỉ dành cho hai người. Ánh sáng phản chiếu qua trần gương tạo nên cảm giác mọi chuyển động đều chậm hơn, mềm mại hơn và cuốn hút hơn.</p>\n\n<p><img src=\"https://mixhotel.vn/uploads/images/62c55c90d6a5eb3785f6ee90/hidden-frenzy__3_.webp\"></p>\n\n<p>Chiếc giường tròn nhung cỡ lớn nằm ở trung tâm căn phòng như một sân khấu của cảm xúc. Và ngay giữa không gian ấy, cột Pole Dance đứng lặng như một biểu tượng của sự tự do, nổi loạn và đầy mê hoặc.</p>\n\n<p><img src=\"https://mixhotel.vn/uploads/images/62c55c90d6a5eb3785f6ee8f/hidden-frenzy__2_.webp\"></p>\n\n<p>Hãy tưởng tượng một đêm khi thành phố đã ngủ. Tiếng nhạc vang nhẹ, ánh đèn đổi màu theo từng nhịp thở, và hai người dần bỏ lại phía sau mọi vai trò thường ngày. Không còn công việc, không còn trách nhiệm, chỉ còn sự kết nối rất riêng mà đôi khi cuộc sống bận rộn khiến ta quên mất.</p>\n\n<p><img src=\"https://mixhotel.vn/uploads/images/62c55c90d6a5eb3785f6ee93/hidden-frenzy__6_.webp\"></p>\n\n<p>Hidden Frenzy không dành cho những buổi hẹn an toàn. Nó dành cho những cặp đôi muốn khám phá một phiên bản khác của chính mình – táo bạo hơn, quyến rũ hơn và chân thật hơn trong cảm xúc.</p>\n\n<p><img src=\"https://mixhotel.vn/uploads/images/62c55c90d6a5eb3785f6ee92/hidden-frenzy__5_.webp\"></p>\n\n<p>Có những căn phòng khiến bạn thấy đẹp.</p>\n\n<p>Hidden Frenzy khiến bạn thấy mình hấp dẫn hơn.</p>\n\n<p>Và đó mới là điều khiến người ta nhớ mãi sau khi cánh cửa khép lại.</p>\n\n<p><img src=\"https://mixhotel.vn/uploads/images/62c55c90d6a5eb3785f6ee91/hidden-frenzy__4_.webp\"></p>\n\n<p>&nbsp;</p>\n\n</div>\n</div>\n</div>\n"
  },
  "after-sunset": {
    "slug": "after-sunset",
    "name": "Room - After Sunset",
    "roomType": "Superior",
    "badge": "Superior Suite",
    "branchId": "branch-mix-boutique-hotel-256b-dang-tien-dong",
    "branchName": "Mix Boutique Hotel 256B Đặng Tiến Đông",
    "branchAddress": "256B Đặng Tiến Đông, Chợ Dừa, Đống Đa, Hà Nội",
    "branchPhone": "0383 104 010",
    "branchZalo": "https://zalo.me/0383104010",
    "heroImage": "/uploads/images/600bd0208a159118a146eb3b/after-sunset__1_.webp",
    "heroSubtitle": "Sự trang trọng và quí tộc chỉ có thể ở căn phòng After Sunset. Tại đây, bạn sẽ là những nhà thường lưu học cách ăn chơi theo kiểu xa hoa. Giường King Size là mơi lý tưởng bắt đầu cho cuộc yêu đầy máu lửa. Ghế tình yêu thử thách độ dẻo dai của các ...",
    "youtubeUrl": "",
    "galleryImages": [
      "/uploads/images/600bd0208a159118a146eb3b/after-sunset__1_.webp",
      "/uploads/images/62c565b5d6a5eb3785f6eec2/after-sunset__1_.webp",
      "/uploads/images/62c565b5d6a5eb3785f6eec3/after-sunset__2_.webp",
      "/uploads/images/62c565b5d6a5eb3785f6eec4/after-sunset__3_.webp",
      "/uploads/images/62c565b5d6a5eb3785f6eec5/after-sunset__4_.webp",
      "/storage/hb/7l/hb7lk73hq8d7mj1a8e6259jwhdgd_after-sunset__2_.webp",
      "/storage/8q/0k/8q0knlx8hzk1jxnmx48i8xuo1gnv_after-sunset__1_.webp"
    ],
    "pricing": {
      "hourly": "199.000 VND/2h",
      "extraHour": "60.000 VND/h",
      "overnight": "500.000 VND",
      "fullDay": "800.000 VND"
    },
    "conceptTitle": "Concept Độc Bản: Room - After Sunset",
    "conceptDesc": "Private concept Master room 01 Đổi gió riêng tư 02 Setup chỉn chu Concept phòng Ấm áp để thư giãn, quyến rũ để tận hưởng buổi hẹn . After Sunset mang đến cảm giác như một buổi tối riêng tư kéo dài sau hoàng hôn. Không gian sử dụng tông màu trầm ấm, ánh sáng dịu và cách bố trí nội thất tạo chiều sâu, phù hợp với những cặp đôi muốn tìm một nơi kín đáo, thư thái nhưng vẫn có nét cuốn hút riêng. Sắc màu sau hoàng hôn Tông màu ấm cùng ánh sáng dịu tạo nên bầu không khí lãng mạn và có phần bí ẩn. After Sunset phù hợp với những cặp đôi muốn một buổi hẹn chậm rãi, riêng tư và khác với không gian khách sạn thông thường. Nội thất Indochine Chi tiết gỗ, họa tiết và ánh sáng tạo cảm giác boutique, sang hơn một phòng nghỉ thông thường. Ghế S-curve Điểm nhấn trải nghiệm riêng của phòng, được bố trí trong tổng thể kín đáo và có gu. Tiện nghi đủ dùng Điều hòa, WiFi, TV giải trí và các tiện ích cơ bản cho thời gian nghỉ theo giờ hoặc qua đêm. Gọi tư vấn phòng Nhắn Zalo xem ảnh thật",
    "perks": [
      {
        "title": "Bồn tắm sục Jacuzzi đôi",
        "desc": "Không gian thư giãn đẳng cấp với bồn tắm sục lãng mạn, nước nóng ấm áp, bọt xà phòng hoa hồng."
      },
      {
        "title": "Ghế tình yêu Tantra cao cấp",
        "desc": "Đường cong công thái học chuẩn chỉn chu, mang đến cảm xúc thăng hoa bất tận cho cặp đôi."
      },
      {
        "title": "Máy chiếu phim Full HD / 4K",
        "desc": "Màn chiếu siêu rộng xem Netflix, YouTube, chill cùng bộ phim lãng mạn yêu thích."
      },
      {
        "title": "Ánh sáng nghệ thuật Mood Light",
        "desc": "Hệ thống đèn neon, trần ngàn sao và tone màu đa sắc tạo nên không khí quyến rũ độc bản."
      },
      {
        "title": "Miễn phí Cosplay & Đạo cụ",
        "desc": "Mượn trang phục hoá trang quyến rũ, đồ chơi tình yêu và Board Game gắn kết miễn phí."
      },
      {
        "title": "Bảo mật thông tin 100%",
        "desc": "Thủ tục check-in kín đáo, nhận phòng riêng tư, bảo vệ thông tin khách hàng tuyệt đối."
      }
    ],
    "faqs": [
      {
        "question": "Phòng Room - After Sunset có sẵn bồn tắm và máy chiếu không?",
        "answer": "Phòng được trang bị đầy đủ tiện nghi cao cấp theo concept riêng, bao gồm bồn tắm thư giãn, ghế tình yêu Tantra, máy chiếu/Smart TV sắc nét và hệ thống đèn lãng mạn."
      },
      {
        "question": "Tôi có cần đặt cọc trước khi đến nhận phòng không?",
        "answer": "Nếu bạn đến trong vòng 15-20 phút, Mix Hotel sẽ giữ phòng miễn phí không cần cọc. Nếu bạn đặt trước nhiều giờ hoặc qua đêm, vui lòng cọc trước để đảm bảo phòng được giữ 100%."
      },
      {
        "question": "Mix Boutique Hotel có hỗ trợ trang trí tiệc kỷ niệm, sinh nhật không?",
        "answer": "Có! Mix Hotel có 4 gói decor chuyên nghiệp gồm nến, hoa hồng, bong bóng, bánh kem và rượu vang ngoại nhập. Hãy báo trước ít nhất 2-4 tiếng để nhân viên setup hoàn hảo nhất."
      },
      {
        "question": "Khách sạn có cho mượn đồ Cosplay và Board Game tình yêu không?",
        "answer": "Mix Hotel hoàn toàn miễn phí mượn trang phục Cosplay quyến rũ, phụ kiện BDSM tinh tế và bộ Board Game thử thách tình yêu cho tất cả khách hàng lưu trú."
      }
    ],
    "storyHtml": "\n<div class=\"container\">\n<div class=\"content-frame\">\n\n<div class=\"content-body size-1vw data_contents\">\n<p style=\"line-height:1.38; text-align:justify; margin-bottom:13px\">“Khi mặt trời lặn, những điều đẹp nhất mới bắt đầu.”</p>\n\n<p>After Sunset giống như một đêm Trung Đông được mang vào giữa lòng Hà Nội.</p>\n\n<p><img alt=\"after-sunset__1_.webp\" src=\"https://mixhotel.vn/uploads/images/62c565b5d6a5eb3785f6eec2/after-sunset__1_.webp\"></p>\n\n<p>Sắc cam nóng bỏng phủ lên những ô cửa chóp nhọn mang đậm hơi thở Ả Rập, tạo nên cảm giác vừa xa lạ vừa mê hoặc. Ánh sáng phản chiếu qua trần gương và gương âm tường khiến không gian như kéo dài vô tận, giống một cung điện bí mật sau hoàng hôn.</p>\n\n<p><img alt=\"after-sunset__2_.webp\" src=\"https://mixhotel.vn/uploads/images/62c565b5d6a5eb3785f6eec3/after-sunset__2_.webp\"></p>\n\n<p>Bước vào đây, bạn sẽ có cảm giác mình đang ở trong một bộ phim điện ảnh với cát vàng, đèn lồng và những giai điệu phương Đông vang lên đâu đó trong trí tưởng tượng.</p>\n\n<p><img alt=\"after-sunset__3_.webp\" src=\"https://mixhotel.vn/uploads/images/62c565b5d6a5eb3785f6eec4/after-sunset__3_.webp\"></p>\n\n<p>Máy chiếu màn hình lớn biến bức tường thành khung trời riêng của hai người. Một bộ phim, một bản nhạc chill, hay chỉ đơn giản là ánh sáng chuyển động trên những mảng tường cam rực – mọi thứ đều trở nên đầy chất điện ảnh.</p>\n\n<p><img alt=\"after-sunset__4_.webp\" src=\"https://mixhotel.vn/uploads/images/62c565b5d6a5eb3785f6eec5/after-sunset__4_.webp\"></p>\n\n<p>After Sunset đặc biệt cuốn hút vào buổi tối. Khi ánh đèn trong phòng hòa cùng sắc trời bên ngoài, căn phòng đạt đến khoảnh khắc đẹp nhất của nó: ấm áp, quyến rũ và hơi thở của sự phiêu lưu.</p>\n\n<p>Đây là lựa chọn hoàn hảo cho những cặp đôi muốn một trải nghiệm khác hẳn mọi khách sạn thông thường – vừa nghệ thuật, vừa bí ẩn, vừa đủ táo bạo để khiến đêm ấy trở nên đáng nhớ.</p>\n\n<p>Mặt trời có thể đã lặn. Nhưng câu chuyện của hai người có lẽ chỉ mới bắt đầu.</p>\n\n<p>&nbsp;</p>\n\n<p>&nbsp;</p>\n\n<p>&nbsp;</p>\n\n<p>&nbsp;</p>\n\n</div>\n</div>\n</div>\n"
  },
  "lollipop": {
    "slug": "lollipop",
    "name": "Room - Lollipop",
    "roomType": "Superior",
    "badge": "Superior Suite",
    "branchId": "branch-mix-boutique-hotel-256b-dang-tien-dong",
    "branchName": "Mix Boutique Hotel 256B Đặng Tiến Đông",
    "branchAddress": "256B Đặng Tiến Đông, Chợ Dừa, Đống Đa, Hà Nội",
    "branchPhone": "0383 104 010",
    "branchZalo": "https://zalo.me/0383104010",
    "heroImage": "/uploads/images/600bd2fa8a159118a146eb51/lollipop__4_.webp",
    "heroSubtitle": "Ngọt ngào và lãng mạn như nhưng bộ phim mỹ sẽ có ngay tại căn phòng Lollipop. Căn phòng đáng yêu với điểm nhấn là chiếc giường hồng màu tím mộng mơ như những nàng công chúa. Được vui đùa trên chiếc giường ngọt ngào ấy quả thật không còn gì hoàn hả...",
    "youtubeUrl": "",
    "galleryImages": [
      "/uploads/images/600bd2fa8a159118a146eb51/lollipop__4_.webp",
      "/uploads/images/62c56a32d6a5eb3785f6eedb/lollipop__1_.webp",
      "/uploads/images/62c56a32d6a5eb3785f6eedc/lollipop__2_.webp",
      "/uploads/images/62c56a32d6a5eb3785f6eedd/lollipop__3_.webp",
      "/uploads/images/62c56a32d6a5eb3785f6eede/lollipop__4_.webp",
      "/storage/co/fl/cofld4kzl86d1ku4fmib0t52w3sz_image_(5).webp",
      "/storage/q6/pi/q6pixi10euuj2cfp0nvhwd7hc6hy_lollipop__2_.webp"
    ],
    "pricing": {
      "hourly": "199.000 VND/2h",
      "extraHour": "60.000 VND/h",
      "overnight": "500.000 VND",
      "fullDay": "800.000 VND"
    },
    "conceptTitle": "Concept Độc Bản: Room - Lollipop",
    "conceptDesc": "Private concept Master room 01 Đổi gió riêng tư 02 Setup chỉn chu Concept phòng Ngọt ngào để yêu chiều, mộng mơ để cùng nhau tận hưởng . Lollipop mang đến cảm giác như một căn lâu đài thu nhỏ, nổi bật với chiếc giường hồng pha tím đầy mộng mơ và không gian đáng yêu như bước ra từ những bộ phim Mỹ. Gương áp trần cùng ánh sáng tạo thêm chiều sâu, giúp buổi hẹn vừa ngọt ngào vừa có chút cuốn hút. Hồng tím mộng mơ Sắc hồng tím ngọt ngào là điểm nhận diện nổi bật của Lollipop, tạo nên không gian trẻ trung, lãng mạn và khác biệt. Căn phòng phù hợp với những cặp đôi muốn một buổi hẹn đáng yêu, riêng tư và có cảm giác như đang bước vào một thế giới riêng của hai người. Nội thất Indochine Chi tiết gỗ, họa tiết và ánh sáng tạo cảm giác boutique, sang hơn một phòng nghỉ thông thường. Ghế S-curve Điểm nhấn trải nghiệm riêng của phòng, được bố trí trong tổng thể kín đáo và có gu. Tiện nghi đủ dùng Điều hòa, WiFi, TV giải trí và các tiện ích cơ bản cho thời gian nghỉ theo giờ hoặc qua đêm. Gọi tư vấn phòng Nhắn Zalo xem ảnh thật",
    "perks": [
      {
        "title": "Bồn tắm sục Jacuzzi đôi",
        "desc": "Không gian thư giãn đẳng cấp với bồn tắm sục lãng mạn, nước nóng ấm áp, bọt xà phòng hoa hồng."
      },
      {
        "title": "Ghế tình yêu Tantra cao cấp",
        "desc": "Đường cong công thái học chuẩn chỉn chu, mang đến cảm xúc thăng hoa bất tận cho cặp đôi."
      },
      {
        "title": "Máy chiếu phim Full HD / 4K",
        "desc": "Màn chiếu siêu rộng xem Netflix, YouTube, chill cùng bộ phim lãng mạn yêu thích."
      },
      {
        "title": "Ánh sáng nghệ thuật Mood Light",
        "desc": "Hệ thống đèn neon, trần ngàn sao và tone màu đa sắc tạo nên không khí quyến rũ độc bản."
      },
      {
        "title": "Miễn phí Cosplay & Đạo cụ",
        "desc": "Mượn trang phục hoá trang quyến rũ, đồ chơi tình yêu và Board Game gắn kết miễn phí."
      },
      {
        "title": "Bảo mật thông tin 100%",
        "desc": "Thủ tục check-in kín đáo, nhận phòng riêng tư, bảo vệ thông tin khách hàng tuyệt đối."
      }
    ],
    "faqs": [
      {
        "question": "Phòng Room - Lollipop có sẵn bồn tắm và máy chiếu không?",
        "answer": "Phòng được trang bị đầy đủ tiện nghi cao cấp theo concept riêng, bao gồm bồn tắm thư giãn, ghế tình yêu Tantra, máy chiếu/Smart TV sắc nét và hệ thống đèn lãng mạn."
      },
      {
        "question": "Tôi có cần đặt cọc trước khi đến nhận phòng không?",
        "answer": "Nếu bạn đến trong vòng 15-20 phút, Mix Hotel sẽ giữ phòng miễn phí không cần cọc. Nếu bạn đặt trước nhiều giờ hoặc qua đêm, vui lòng cọc trước để đảm bảo phòng được giữ 100%."
      },
      {
        "question": "Mix Boutique Hotel có hỗ trợ trang trí tiệc kỷ niệm, sinh nhật không?",
        "answer": "Có! Mix Hotel có 4 gói decor chuyên nghiệp gồm nến, hoa hồng, bong bóng, bánh kem và rượu vang ngoại nhập. Hãy báo trước ít nhất 2-4 tiếng để nhân viên setup hoàn hảo nhất."
      },
      {
        "question": "Khách sạn có cho mượn đồ Cosplay và Board Game tình yêu không?",
        "answer": "Mix Hotel hoàn toàn miễn phí mượn trang phục Cosplay quyến rũ, phụ kiện BDSM tinh tế và bộ Board Game thử thách tình yêu cho tất cả khách hàng lưu trú."
      }
    ],
    "storyHtml": "\n<div class=\"container\">\n<div class=\"content-frame\">\n\n<div class=\"content-body size-1vw data_contents\">\n<p style=\"line-height:1.38; text-align:justify; margin-bottom:13px\">Có những nơi khiến tim đập nhanh.</p>\n\n<p>Lolipop khiến tim đập nhẹ thôi, nhưng rất lâu.</p>\n\n<p>Và đôi khi, chính sự ngọt ngào ấy mới là điều khiến người ta muốn quay lại thêm nhiều lần nữa.</p>\n\n<p><iframe frameborder=\"0\" height=\"315\" src=\"https://www.youtube.com/embed/LqDptklh9dc\" width=\"560\"></iframe></p>\n\n<p style=\"line-height:1.38; text-align:justify; margin-bottom:13px\">“Ngọt ngào như lần đầu tiên thích một người.”</p>\n\n<p>Lolipop giống như một viên kẹo hồng được gói bằng ánh sáng và sự dịu dàng.</p>\n\n<p><img alt=\"lollipop__1_.webp\" src=\"https://mixhotel.vn/uploads/images/62c56a32d6a5eb3785f6eedb/lollipop__1_.webp\">&nbsp;</p>\n\n<p>Tông pastel phủ khắp căn phòng tạo cảm giác nhẹ tênh ngay từ ánh nhìn đầu tiên. Chiếc giường nhung tròn màu hồng nằm ở trung tâm như một đám mây mềm mại, trong khi hệ gương trần và gương tường khiến không gian trở nên lung linh và đầy chất mộng mơ.</p>\n\n<p><img alt=\"lollipop__2_.webp\" src=\"https://mixhotel.vn/uploads/images/62c56a32d6a5eb3785f6eedc/lollipop__2_.webp\">&nbsp;</p>\n\n<p>Đây là căn phòng khiến người ta muốn chụp ảnh ngay khi bước vào. Nhưng điều đẹp hơn những bức ảnh là cảm giác mà nó mang lại: trẻ trung, vui vẻ và không chút áp lực.</p>\n\n<p>Máy chiếu khổ lớn biến buổi tối thành một buổi xem phim riêng. Hai người có thể nằm dài trên giường, xem một bộ phim tình cảm, ăn bánh ngọt và cười vì những điều rất nhỏ. Không cần sự sang trọng choáng ngợp, Lolipop chinh phục bằng sự dễ thương khiến trái tim mềm lại.</p>\n\n<p><img alt=\"lollipop__3_.webp\" src=\"https://mixhotel.vn/uploads/images/62c56a32d6a5eb3785f6eedd/lollipop__3_.webp\">&nbsp;</p>\n\n<p>Căn phòng này đặc biệt hợp với những cặp đôi mới yêu, những người thích phong cách Hàn Quốc, thích chụp ảnh couple và muốn lưu giữ những khoảnh khắc “đáng yêu hơn là hoàn hảo”.</p>\n\n<p><img alt=\"lollipop__4_.webp\" src=\"https://mixhotel.vn/uploads/images/62c56a32d6a5eb3785f6eede/lollipop__4_.webp\"></p>\n\n</div>\n</div>\n</div>\n"
  },
  "blowj-up": {
    "slug": "blowj-up",
    "name": "Room - Blowj Up",
    "roomType": "Superior",
    "badge": "Superior Suite",
    "branchId": "branch-mix-boutique-hotel-256b-dang-tien-dong",
    "branchName": "Mix Boutique Hotel 256B Đặng Tiến Đông",
    "branchAddress": "256B Đặng Tiến Đông, Chợ Dừa, Đống Đa, Hà Nội",
    "branchPhone": "0383 104 010",
    "branchZalo": "https://zalo.me/0383104010",
    "heroImage": "/uploads/images/600bd5d88a159118a146eb67/blowj-up__4_.webp",
    "heroSubtitle": "Blowj up là nơi chưa phong vị ngọt ngào cho cuộc tình thêm đổi gió. Với thiết kế đơn giãn, tình tế cùng màu trắng là chủ đạo đã tạo nên sự đơn giãn nhưng rất gợi tình. Giường treo lửng lơ mới lạ làm nên cảm giác thăng hoa và thách thức mọi sự xập ...",
    "youtubeUrl": "",
    "galleryImages": [
      "/uploads/images/600bd5d88a159118a146eb67/blowj-up__4_.webp",
      "/uploads/images/62c56d55d6a5eb3785f6eef0/blowj-up__1_.webp",
      "/uploads/images/62c56d55d6a5eb3785f6eef1/blowj-up__2_.webp",
      "/uploads/images/62c56d55d6a5eb3785f6eef2/blowj-up__3_.webp",
      "/uploads/images/62c56d55d6a5eb3785f6eef3/blowj-up__4_.webp",
      "/uploads/images/62c56d55d6a5eb3785f6eef4/blowj-up__5_.webp",
      "/uploads/images/62c56d55d6a5eb3785f6eef5/blowj-up__6_.webp",
      "/uploads/images/62c56d55d6a5eb3785f6eef6/blowj-up__7_.webp",
      "/uploads/images/62c56d55d6a5eb3785f6eef7/blowj-up__8_.webp",
      "/storage/nx/6t/nx6tjyj89fch1398y4pjozo87dvj_image_(6).webp",
      "/storage/jd/u5/jdu5xj328i788sm6a2ad77rbn1bi_blowj-up__3_.webp"
    ],
    "pricing": {
      "hourly": "199.000 VND/2h",
      "extraHour": "60.000 VND/h",
      "overnight": "500.000 VND",
      "fullDay": "800.000 VND"
    },
    "conceptTitle": "Concept Độc Bản: Room - Blowj Up",
    "conceptDesc": "Private concept Master room 01 Đổi gió riêng tư 02 Setup chỉn chu Concept phòng Đơn giản để tinh tế, bay bổng để cảm xúc thăng hoa . Blowj Up theo đuổi phong cách tối giản với sắc trắng chủ đạo, tạo cảm giác nhẹ nhàng nhưng vẫn đầy cuốn hút. Điểm nhấn là chiếc giường treo lơ lửng, kết hợp phòng tắm kính và rèm mỏng, mang đến một không gian vừa riêng tư, vừa mới lạ cho các cặp đôi. Trắng tinh khôi, bay bổng Sắc trắng nhẹ nhàng cùng thiết kế giường treo độc đáo tạo cảm giác như đang bay giữa những tầng mây. Không gian phù hợp với những cặp đôi muốn một buổi hẹn tối giản, riêng tư nhưng vẫn có điểm nhấn khác biệt. Nội thất Indochine Chi tiết gỗ, họa tiết và ánh sáng tạo cảm giác boutique, sang hơn một phòng nghỉ thông thường. Ghế S-curve Điểm nhấn trải nghiệm riêng của phòng, được bố trí trong tổng thể kín đáo và có gu. Tiện nghi đủ dùng Điều hòa, WiFi, TV giải trí và các tiện ích cơ bản cho thời gian nghỉ theo giờ hoặc qua đêm. Gọi tư vấn phòng Nhắn Zalo xem ảnh thật",
    "perks": [
      {
        "title": "Bồn tắm sục Jacuzzi đôi",
        "desc": "Không gian thư giãn đẳng cấp với bồn tắm sục lãng mạn, nước nóng ấm áp, bọt xà phòng hoa hồng."
      },
      {
        "title": "Ghế tình yêu Tantra cao cấp",
        "desc": "Đường cong công thái học chuẩn chỉn chu, mang đến cảm xúc thăng hoa bất tận cho cặp đôi."
      },
      {
        "title": "Máy chiếu phim Full HD / 4K",
        "desc": "Màn chiếu siêu rộng xem Netflix, YouTube, chill cùng bộ phim lãng mạn yêu thích."
      },
      {
        "title": "Ánh sáng nghệ thuật Mood Light",
        "desc": "Hệ thống đèn neon, trần ngàn sao và tone màu đa sắc tạo nên không khí quyến rũ độc bản."
      },
      {
        "title": "Miễn phí Cosplay & Đạo cụ",
        "desc": "Mượn trang phục hoá trang quyến rũ, đồ chơi tình yêu và Board Game gắn kết miễn phí."
      },
      {
        "title": "Bảo mật thông tin 100%",
        "desc": "Thủ tục check-in kín đáo, nhận phòng riêng tư, bảo vệ thông tin khách hàng tuyệt đối."
      }
    ],
    "faqs": [
      {
        "question": "Phòng Room - Blowj Up có sẵn bồn tắm và máy chiếu không?",
        "answer": "Phòng được trang bị đầy đủ tiện nghi cao cấp theo concept riêng, bao gồm bồn tắm thư giãn, ghế tình yêu Tantra, máy chiếu/Smart TV sắc nét và hệ thống đèn lãng mạn."
      },
      {
        "question": "Tôi có cần đặt cọc trước khi đến nhận phòng không?",
        "answer": "Nếu bạn đến trong vòng 15-20 phút, Mix Hotel sẽ giữ phòng miễn phí không cần cọc. Nếu bạn đặt trước nhiều giờ hoặc qua đêm, vui lòng cọc trước để đảm bảo phòng được giữ 100%."
      },
      {
        "question": "Mix Boutique Hotel có hỗ trợ trang trí tiệc kỷ niệm, sinh nhật không?",
        "answer": "Có! Mix Hotel có 4 gói decor chuyên nghiệp gồm nến, hoa hồng, bong bóng, bánh kem và rượu vang ngoại nhập. Hãy báo trước ít nhất 2-4 tiếng để nhân viên setup hoàn hảo nhất."
      },
      {
        "question": "Khách sạn có cho mượn đồ Cosplay và Board Game tình yêu không?",
        "answer": "Mix Hotel hoàn toàn miễn phí mượn trang phục Cosplay quyến rũ, phụ kiện BDSM tinh tế và bộ Board Game thử thách tình yêu cho tất cả khách hàng lưu trú."
      }
    ],
    "storyHtml": "\n<div class=\"container\">\n<div class=\"content-frame\">\n\n<div class=\"content-body size-1vw data_contents\">\n<p style=\"line-height: 1.38; margin-bottom: 13px; text-align: justify;\">“Không dành cho những trái tim thích sự an toàn.”</p>\n\n<p style=\"text-align: justify;\">Blowj Up bước vào cảm xúc bằng sự nổi loạn.</p>\n\n<p style=\"text-align: justify;\"><img alt=\"blowj-up__1_.webp\" src=\"https://mixhotel.vn/uploads/images/62c56d55d6a5eb3785f6eef0/blowj-up__1_.webp\">&nbsp;</p>\n\n<p style=\"text-align: justify;\">Tường gạch trần sơn đỏ, ánh đèn tối, gương trần và gương tường tạo nên bầu không khí như một studio underground giữa đêm. Không gian mang hơi thở mạnh mẽ, táo bạo và đầy cá tính ngay từ giây đầu tiên.</p>\n\n<p style=\"text-align: justify;\"><img alt=\"blowj-up__2_.webp\" src=\"https://mixhotel.vn/uploads/images/62c56d55d6a5eb3785f6eef1/blowj-up__2_.webp\">&nbsp;</p>\n\n<p style=\"text-align: justify;\">Điểm nhấn ấn tượng nhất là chữ X cỡ lớn gắn trên tường – biểu tượng của sự phá vỡ giới hạn và tinh thần BDSM được thể hiện theo phong cách nghệ thuật thay vì phô bày trực diện.</p>\n\n<p style=\"text-align: justify;\"><img alt=\"blowj-up__3_.webp\" src=\"https://mixhotel.vn/uploads/images/62c56d55d6a5eb3785f6eef2/blowj-up__3_.webp\">&nbsp;</p>\n\n<p style=\"text-align: justify;\">Hãy tưởng tượng tiếng nhạc bass vang nhẹ, ánh đỏ phản chiếu trên những mảng gạch thô, và hai người bước vào một thế giới hoàn toàn tách biệt với cuộc sống thường ngày. Blowj Up không cố gắng làm bạn thấy dễ chịu; nó khiến bạn thấy phấn khích.</p>\n\n<p style=\"text-align: justify;\"><img alt=\"blowj-up__4_.webp\" src=\"https://mixhotel.vn/uploads/images/62c56d55d6a5eb3785f6eef3/blowj-up__4_.webp\">&nbsp;</p>\n\n<p style=\"text-align: justify;\">Đây là căn phòng dành cho những cặp đôi thích khám phá, thích sự khác biệt và muốn một trải nghiệm có cá tính mạnh hơn hẳn những khách sạn thông thường. Mỗi chi tiết đều được thiết kế để tạo cảm giác như đang ở trong một bộ phim nghệ thuật nổi loạn và đầy năng lượng.</p>\n\n<p style=\"text-align: justify;\"><img alt=\"blowj-up__5_.webp\" src=\"https://mixhotel.vn/uploads/images/62c56d55d6a5eb3785f6eef4/blowj-up__5_.webp\">&nbsp;</p>\n\n<p style=\"text-align: justify;\">Có thể bạn sẽ chọn Blowj Up vì sự tò mò.</p>\n\n<p style=\"text-align: justify;\">Nhưng điều khiến người ta nhớ về nó thường là cảm giác được giải phóng khỏi mọi khuôn mẫu quen thuộc.</p>\n\n<p style=\"text-align: justify;\">Đêm nay, hãy thử khác đi một chút.</p>\n\n<p style=\"text-align: justify;\"><img alt=\"blowj-up__6_.webp\" src=\"https://mixhotel.vn/uploads/images/62c56d55d6a5eb3785f6eef5/blowj-up__6_.webp\">&nbsp;</p>\n\n<p style=\"text-align: justify;\"><img alt=\"blowj-up__7_.webp\" src=\"https://mixhotel.vn/uploads/images/62c56d55d6a5eb3785f6eef6/blowj-up__7_.webp\">&nbsp;</p>\n\n<p style=\"text-align: justify;\"><img alt=\"blowj-up__8_.webp\" src=\"https://mixhotel.vn/uploads/images/62c56d55d6a5eb3785f6eef7/blowj-up__8_.webp\"></p>\n\n</div>\n</div>\n</div>\n"
  },
  "lalaland": {
    "slug": "lalaland",
    "name": "Room - Lalaland",
    "roomType": "Superior",
    "badge": "Superior Suite",
    "branchId": "branch-mix-boutique-hotel-256b-dang-tien-dong",
    "branchName": "Mix Boutique Hotel 256B Đặng Tiến Đông",
    "branchAddress": "256B Đặng Tiến Đông, Chợ Dừa, Đống Đa, Hà Nội",
    "branchPhone": "0383 104 010",
    "branchZalo": "https://zalo.me/0383104010",
    "heroImage": "/uploads/images/600bd7168a159118a146eb71/lalaland__4_.webp",
    "heroSubtitle": "Nơi chứa đựng những chuyện tình cảm ngọt ngào là lãng mạn chỉ có thể là Lalaland. Không hào nhoáng và ồn ào, Lalaland mang lại cảm giác ấm cúng và ngọt ngào của những câu chuyện tình yêu bình dị nhưng cũng đầy kích thích. Không gian sang chảnh the...",
    "youtubeUrl": "",
    "galleryImages": [
      "/uploads/images/600bd7168a159118a146eb71/lalaland__4_.webp",
      "/uploads/images/62c56ec5d6a5eb3785f6eefc/lalaland__1_.webp",
      "/uploads/images/62c56ec5d6a5eb3785f6eefd/lalaland__2_.webp",
      "/uploads/images/62c56ec5d6a5eb3785f6eefe/lalaland__3_.webp",
      "/uploads/images/62c56ec5d6a5eb3785f6eeff/lalaland__4_.webp",
      "/uploads/images/62c56ec5d6a5eb3785f6ef00/lalaland__5_.webp",
      "/uploads/images/62c56ec5d6a5eb3785f6ef01/lalaland__6_.webp",
      "/storage/oz/um/ozum7mawkdcvzzq36h3e22epxkc0_lalaland__1_.webp",
      "/storage/5t/os/5tos4hu4q0rt1t8cf06prjxie7ue_lalaland__3_.webp"
    ],
    "pricing": {
      "hourly": "199.000 VND/2h",
      "extraHour": "60.000 VND/h",
      "overnight": "500.000 VND",
      "fullDay": "800.000 VND"
    },
    "conceptTitle": "Concept Độc Bản: Room - Lalaland",
    "conceptDesc": "Private concept Master room 01 Đổi gió riêng tư 02 Setup chỉn chu Concept phòng Ngọt ngào để yêu nhau, mộng mơ để cùng nhau tận hưởng . Lalaland không đi theo kiểu hào nhoáng hay quá cầu kỳ. Không gian mang cảm giác ấm cúng, ngọt ngào và thơ mộng, nổi bật với giường hình trái tim, những bông hoa trang trí và chiếc xích đu bên cửa sổ. Rạp chiếu phim ngay trong phòng cũng tạo thêm một trải nghiệm riêng cho buổi hẹn. Sắc màu tình yêu ngọt ngào Giường trái tim, hoa xinh và ánh sáng ấm áp tạo nên một không gian lãng mạn, gần gũi. Lalaland phù hợp với những cặp đôi muốn một buổi hẹn nhẹ nhàng, ngọt ngào nhưng vẫn có những trải nghiệm mới mẻ như xem phim cùng nhau. Nội thất Indochine Chi tiết gỗ, họa tiết và ánh sáng tạo cảm giác boutique, sang hơn một phòng nghỉ thông thường. Ghế S-curve Điểm nhấn trải nghiệm riêng của phòng, được bố trí trong tổng thể kín đáo và có gu. Tiện nghi đủ dùng Điều hòa, WiFi, TV giải trí và các tiện ích cơ bản cho thời gian nghỉ theo giờ hoặc qua đêm. Gọi tư vấn phòng Nhắn Zalo xem ảnh thật",
    "perks": [
      {
        "title": "Bồn tắm sục Jacuzzi đôi",
        "desc": "Không gian thư giãn đẳng cấp với bồn tắm sục lãng mạn, nước nóng ấm áp, bọt xà phòng hoa hồng."
      },
      {
        "title": "Ghế tình yêu Tantra cao cấp",
        "desc": "Đường cong công thái học chuẩn chỉn chu, mang đến cảm xúc thăng hoa bất tận cho cặp đôi."
      },
      {
        "title": "Máy chiếu phim Full HD / 4K",
        "desc": "Màn chiếu siêu rộng xem Netflix, YouTube, chill cùng bộ phim lãng mạn yêu thích."
      },
      {
        "title": "Ánh sáng nghệ thuật Mood Light",
        "desc": "Hệ thống đèn neon, trần ngàn sao và tone màu đa sắc tạo nên không khí quyến rũ độc bản."
      },
      {
        "title": "Miễn phí Cosplay & Đạo cụ",
        "desc": "Mượn trang phục hoá trang quyến rũ, đồ chơi tình yêu và Board Game gắn kết miễn phí."
      },
      {
        "title": "Bảo mật thông tin 100%",
        "desc": "Thủ tục check-in kín đáo, nhận phòng riêng tư, bảo vệ thông tin khách hàng tuyệt đối."
      }
    ],
    "faqs": [
      {
        "question": "Phòng Room - Lalaland có sẵn bồn tắm và máy chiếu không?",
        "answer": "Phòng được trang bị đầy đủ tiện nghi cao cấp theo concept riêng, bao gồm bồn tắm thư giãn, ghế tình yêu Tantra, máy chiếu/Smart TV sắc nét và hệ thống đèn lãng mạn."
      },
      {
        "question": "Tôi có cần đặt cọc trước khi đến nhận phòng không?",
        "answer": "Nếu bạn đến trong vòng 15-20 phút, Mix Hotel sẽ giữ phòng miễn phí không cần cọc. Nếu bạn đặt trước nhiều giờ hoặc qua đêm, vui lòng cọc trước để đảm bảo phòng được giữ 100%."
      },
      {
        "question": "Mix Boutique Hotel có hỗ trợ trang trí tiệc kỷ niệm, sinh nhật không?",
        "answer": "Có! Mix Hotel có 4 gói decor chuyên nghiệp gồm nến, hoa hồng, bong bóng, bánh kem và rượu vang ngoại nhập. Hãy báo trước ít nhất 2-4 tiếng để nhân viên setup hoàn hảo nhất."
      },
      {
        "question": "Khách sạn có cho mượn đồ Cosplay và Board Game tình yêu không?",
        "answer": "Mix Hotel hoàn toàn miễn phí mượn trang phục Cosplay quyến rũ, phụ kiện BDSM tinh tế và bộ Board Game thử thách tình yêu cho tất cả khách hàng lưu trú."
      }
    ],
    "storyHtml": "\n<div class=\"container\">\n<div class=\"content-frame\">\n\n<div class=\"content-body size-1vw data_contents\">\n<p style=\"line-height:1.38; text-align:justify; margin-bottom:13px\">“Một đêm điện ảnh dành riêng cho hai người.”</p>\n\n<p>Lalaland không phải là một căn phòng.</p>\n\n<p><img alt=\"lalaland__1_.webp\" src=\"https://mixhotel.vn/uploads/images/62c56ec5d6a5eb3785f6eefc/lalaland__1_.webp\"></p>\n\n<p>Nó là một bộ phim.</p>\n\n<p>Ngay khi bước vào, bạn sẽ hiểu vì sao cái tên ấy được chọn. Không gian mang đậm tinh thần cinema với màn chiếu khổ lớn, ánh sáng mềm mại và những chi tiết khiến người ta có cảm giác mình đang bước vào hậu trường của một câu chuyện tình lãng mạn.</p>\n\n<p><img alt=\"lalaland__3_.webp\" src=\"https://mixhotel.vn/uploads/images/62c56ec5d6a5eb3785f6eefe/lalaland__3_.webp\"></p>\n\n<p>Chiếc giường nhung tròn hình trái tim nằm ở trung tâm như một khung hình biểu tượng. Bên cạnh đó là chiếc xích đu nhẹ nhàng đung đưa, nơi hai người có thể ngồi cạnh nhau, trò chuyện, chụp ảnh hoặc đơn giản là tận hưởng cảm giác rất “điện ảnh” mà căn phòng mang lại.</p>\n\n<p><img alt=\"lalaland__2_.webp\" src=\"https://mixhotel.vn/uploads/images/62c56ec5d6a5eb3785f6eefd/lalaland__2_.webp\"></p>\n\n<p>Khi máy chiếu bật lên, cả không gian thay đổi. Ánh sáng chuyển động trên tường, tiếng nhạc vang khẽ, và căn phòng giống như một rạp chiếu phim riêng chỉ có hai khán giả và cũng chính là hai nhân vật chính.</p>\n\n<p><img alt=\"lalaland__4_.webp\" src=\"https://mixhotel.vn/uploads/images/62c56ec5d6a5eb3785f6eeff/lalaland__4_.webp\"></p>\n\n<p>Lalaland đặc biệt phù hợp cho những cặp đôi thích chụp ảnh, quay video, làm kỷ niệm, hoặc đơn giản là muốn có một đêm vừa lãng mạn vừa vui vẻ. Mọi góc trong phòng đều được tạo ra để lên hình đẹp như poster phim.</p>\n\n<p><img alt=\"lalaland__5_.webp\" src=\"https://mixhotel.vn/uploads/images/62c56ec5d6a5eb3785f6ef00/lalaland__5_.webp\"></p>\n\n<p>Có những nơi để ngủ.</p>\n\n<p>Có những nơi để yêu.</p>\n\n<p>Và có những nơi để cùng nhau sống trong một bộ phim mà sau này mỗi khi xem lại ảnh, hai người sẽ mỉm cười và nghĩ:</p>\n\n<p>“Đêm ấy thật sự giống Lalaland.”</p>\n\n<p><img alt=\"lalaland__6_.webp\" src=\"https://mixhotel.vn/uploads/images/62c56ec5d6a5eb3785f6ef01/lalaland__6_.webp\"></p>\n\n<p>&nbsp;</p>\n\n<p>&nbsp;</p>\n\n<p>&nbsp;</p>\n\n<p>&nbsp;</p>\n\n<p>&nbsp;</p>\n\n<p>&nbsp;</p>\n\n<p>&nbsp;</p>\n\n</div>\n</div>\n</div>\n"
  },
  "bad-boy": {
    "slug": "bad-boy",
    "name": "Room - Bad Boy",
    "roomType": "Superior",
    "badge": "Superior Suite",
    "branchId": "branch-mix-boutique-hotel-256b-dang-tien-dong",
    "branchName": "Mix Boutique Hotel 256B Đặng Tiến Đông",
    "branchAddress": "256B Đặng Tiến Đông, Chợ Dừa, Đống Đa, Hà Nội",
    "branchPhone": "0383 104 010",
    "branchZalo": "https://zalo.me/0383104010",
    "heroImage": "/uploads/images/600ac5388a159118a146eac9/bad-boy__2_.webp",
    "heroSubtitle": "Nếu bạn muốn tìm một căn phòng với đầy sự hư hỏng nhưng lại rất sang trọng thì hãy đến với Bad Boy. Căn phòng với nhiều hương vị tình ái và sự quyến rũ vô hình làm cho bạn chỉ muốn yêu ngay khi vô phòng. Với thiết kế đặc biệt và tông đỏ chủ đạo, c...",
    "youtubeUrl": "",
    "galleryImages": [
      "/uploads/images/600ac5388a159118a146eac9/bad-boy__2_.webp",
      "/uploads/images/62c560e5d6a5eb3785f6eea4/bad-boy__1_.webp",
      "/uploads/images/62c560e5d6a5eb3785f6eea5/bad-boy__2_.webp",
      "/uploads/images/62c560e5d6a5eb3785f6eea6/bad-boy__3_.webp",
      "/uploads/images/62c560e5d6a5eb3785f6eea7/bad-boy__4_.webp",
      "/uploads/images/62c560e5d6a5eb3785f6eea8/bad-boy__5_.webp",
      "/uploads/images/62c560e5d6a5eb3785f6eea9/bad-boy__6_.webp",
      "/uploads/images/62c560e5d6a5eb3785f6eeaa/bad-boy__7_.webp",
      "/storage/m1/cy/m1cylo3l3dfdnipfq3gu9wnydgdg_bad-boy__6_.webp",
      "/storage/px/ki/pxkiz5hvg1mpgftwc612pehrwr60_bad-boy__3_.webp"
    ],
    "pricing": {
      "hourly": "199.000 VND/2h",
      "extraHour": "60.000 VND/h",
      "overnight": "500.000 VND",
      "fullDay": "800.000 VND"
    },
    "conceptTitle": "Concept Độc Bản: Room - Bad Boy",
    "conceptDesc": "Private concept Master room 01 Đổi gió riêng tư 02 Setup chỉn chu Concept phòng Đủ táo bạo để đổi gió, đủ riêng tư để thả mình vào cuộc hẹn . Bad Boy gây ấn tượng với tông đỏ chủ đạo, chiếc giường tròn nằm trong lồng sắt, gương áp trần và ánh sáng có chiều sâu. Tổng thể tạo cảm giác bí ẩn, quyến rũ và có phần nổi loạn, phù hợp với những cặp đôi muốn thử một không gian khác biệt hơn. Sắc đỏ đầy cuốn hút Tông đỏ nổi bật kết hợp cùng lồng sắt và những chi tiết táo bạo tạo nên độ tương phản mạnh cho căn phòng. Không gian phù hợp với những cặp đôi muốn một buổi hẹn mới lạ, cá tính và nhiều cảm xúc hơn. Nội thất Indochine Chi tiết gỗ, họa tiết và ánh sáng tạo cảm giác boutique, sang hơn một phòng nghỉ thông thường. Ghế S-curve Điểm nhấn trải nghiệm riêng của phòng, được bố trí trong tổng thể kín đáo và có gu. Tiện nghi đủ dùng Điều hòa, WiFi, TV giải trí và các tiện ích cơ bản cho thời gian nghỉ theo giờ hoặc qua đêm. Gọi tư vấn phòng Nhắn Zalo xem ảnh thật",
    "perks": [
      {
        "title": "Bồn tắm sục Jacuzzi đôi",
        "desc": "Không gian thư giãn đẳng cấp với bồn tắm sục lãng mạn, nước nóng ấm áp, bọt xà phòng hoa hồng."
      },
      {
        "title": "Ghế tình yêu Tantra cao cấp",
        "desc": "Đường cong công thái học chuẩn chỉn chu, mang đến cảm xúc thăng hoa bất tận cho cặp đôi."
      },
      {
        "title": "Máy chiếu phim Full HD / 4K",
        "desc": "Màn chiếu siêu rộng xem Netflix, YouTube, chill cùng bộ phim lãng mạn yêu thích."
      },
      {
        "title": "Ánh sáng nghệ thuật Mood Light",
        "desc": "Hệ thống đèn neon, trần ngàn sao và tone màu đa sắc tạo nên không khí quyến rũ độc bản."
      },
      {
        "title": "Miễn phí Cosplay & Đạo cụ",
        "desc": "Mượn trang phục hoá trang quyến rũ, đồ chơi tình yêu và Board Game gắn kết miễn phí."
      },
      {
        "title": "Bảo mật thông tin 100%",
        "desc": "Thủ tục check-in kín đáo, nhận phòng riêng tư, bảo vệ thông tin khách hàng tuyệt đối."
      }
    ],
    "faqs": [
      {
        "question": "Phòng Room - Bad Boy có sẵn bồn tắm và máy chiếu không?",
        "answer": "Phòng được trang bị đầy đủ tiện nghi cao cấp theo concept riêng, bao gồm bồn tắm thư giãn, ghế tình yêu Tantra, máy chiếu/Smart TV sắc nét và hệ thống đèn lãng mạn."
      },
      {
        "question": "Tôi có cần đặt cọc trước khi đến nhận phòng không?",
        "answer": "Nếu bạn đến trong vòng 15-20 phút, Mix Hotel sẽ giữ phòng miễn phí không cần cọc. Nếu bạn đặt trước nhiều giờ hoặc qua đêm, vui lòng cọc trước để đảm bảo phòng được giữ 100%."
      },
      {
        "question": "Mix Boutique Hotel có hỗ trợ trang trí tiệc kỷ niệm, sinh nhật không?",
        "answer": "Có! Mix Hotel có 4 gói decor chuyên nghiệp gồm nến, hoa hồng, bong bóng, bánh kem và rượu vang ngoại nhập. Hãy báo trước ít nhất 2-4 tiếng để nhân viên setup hoàn hảo nhất."
      },
      {
        "question": "Khách sạn có cho mượn đồ Cosplay và Board Game tình yêu không?",
        "answer": "Mix Hotel hoàn toàn miễn phí mượn trang phục Cosplay quyến rũ, phụ kiện BDSM tinh tế và bộ Board Game thử thách tình yêu cho tất cả khách hàng lưu trú."
      }
    ],
    "storyHtml": "\n<div class=\"container\">\n<div class=\"content-frame\">\n\n<div class=\"content-body size-1vw data_contents\">\n<p style=\"line-height:1.38; text-align:justify; margin-bottom:13px\">“Đêm nay, hãy thử bước vào vùng cấm của trí tưởng tượng.”</p>\n\n<p>Badboy không hề che giấu cá tính của mình.</p>\n\n<p><img alt=\"bad-boy__1_.webp\" src=\"https://mixhotel.vn/uploads/images/62c560e5d6a5eb3785f6eea4/bad-boy__1_.webp\"></p>\n\n<p>Sắc đỏ rực phủ khắp căn phòng như một cảnh phim nóng bỏng giữa đêm. Chiếc giường lồng chim cỡ lớn tạo nên cảm giác vừa sang trọng vừa đầy khiêu khích, trong khi ánh đèn được thiết kế để mọi góc nhìn đều trở nên mạnh mẽ và cuốn hút hơn.</p>\n\n<p><img alt=\"bad-boy__2_.webp\" src=\"https://mixhotel.vn/uploads/images/62c560e5d6a5eb3785f6eea5/bad-boy__2_.webp\"></p>\n\n<p>Điểm đặc biệt của Badboy nằm ở chiếc tủ trưng bày những món đồ BDSM và cosplay – không phải để phô bày, mà để khơi gợi sự tò mò và tinh thần khám phá của các cặp đôi.</p>\n\n<p><img alt=\"bad-boy__5_.webp\" src=\"https://mixhotel.vn/uploads/images/62c560e5d6a5eb3785f6eea8/bad-boy__5_.webp\"></p>\n\n<p>Hãy tưởng tượng hai người cùng mở từng ngăn tủ, cùng cười, cùng thử những điều mới mẻ mà bình thường chưa từng dám nghĩ tới. Không gian này biến sự ngại ngùng thành trò chơi, biến sự tò mò thành kết nối.</p>\n\n<p><img alt=\"bad-boy__3_.webp\" src=\"https://mixhotel.vn/uploads/images/62c560e5d6a5eb3785f6eea6/bad-boy__3_.webp\"></p>\n\n<p>Badboy không dành cho sự nghiêm túc. Nó dành cho những cặp đôi biết tận hưởng, biết đùa nghịch với cảm xúc và muốn biến một buổi hẹn thành một cuộc phiêu lưu riêng tư.</p>\n\n<p><img alt=\"bad-boy__4_.webp\" src=\"https://mixhotel.vn/uploads/images/62c560e5d6a5eb3785f6eea7/bad-boy__4_.webp\"></p>\n\n<p>Tiếng nhạc, ánh đèn đỏ, chiếc giường lồng chim và những bí mật đang chờ được khám phá – tất cả tạo nên cảm giác như đang ở trong một bộ phim mà hai người vừa là nhân vật chính, vừa là đạo diễn.</p>\n\n<p>Có những đêm để nghỉ ngơi.</p>\n\n<p>Badboy là đêm để giải phóng trí tưởng tượng.</p>\n\n<p><img alt=\"bad-boy__6_.webp\" src=\"https://mixhotel.vn/uploads/images/62c560e5d6a5eb3785f6eea9/bad-boy__6_.webp\">&nbsp;</p>\n\n<p><img alt=\"bad-boy__7_.webp\" src=\"https://mixhotel.vn/uploads/images/62c560e5d6a5eb3785f6eeaa/bad-boy__7_.webp\"></p>\n\n</div>\n</div>\n</div>\n"
  },
  "oasis": {
    "slug": "oasis",
    "name": "Room - Oasis",
    "roomType": "Deluxe",
    "badge": "Deluxe Suite",
    "branchId": "branch-mix-boutique-hotel-256b-dang-tien-dong",
    "branchName": "Mix Boutique Hotel 256B Đặng Tiến Đông",
    "branchAddress": "256B Đặng Tiến Đông, Chợ Dừa, Đống Đa, Hà Nội",
    "branchPhone": "0383 104 010",
    "branchZalo": "https://zalo.me/0383104010",
    "heroImage": "/uploads/images/600ac3df8a159118a146eac0/oasis.webp",
    "heroSubtitle": "Nét đặc biệt tạo nên căn phòng Oasis là không gian thư thái tạo nên sự thoải mái khi yêu. Với tông trắng là chủ đạo của căn phòng cùng với những ánh đèn vàng là thứ thu hút và nhen nhóp đóm lửa đang rực cháy của hai trái tim. Giường trắng tinh khô...",
    "youtubeUrl": "",
    "galleryImages": [
      "/uploads/images/600ac3df8a159118a146eac0/oasis.webp",
      "/uploads/images/62c55e78d6a5eb3785f6ee98/oasis__1_.webp",
      "/uploads/images/62c55e78d6a5eb3785f6ee99/oasis__2_.webp",
      "/uploads/images/62c55e78d6a5eb3785f6ee9a/oasis__3_.webp",
      "/uploads/images/62c55e78d6a5eb3785f6ee9b/oasis__4_.webp",
      "/uploads/images/62c55e78d6a5eb3785f6ee9c/oasis__5_.webp",
      "/uploads/images/62c55e78d6a5eb3785f6ee9d/oasis__6_.webp",
      "/storage/wu/4n/wu4nj16fx78owyki1feq1ie8av3p_oasis__6_.webp",
      "/storage/z7/96/z796lc9k2fr2jsswzz4fz1zyvrf5_oasis__5_.webp"
    ],
    "pricing": {
      "hourly": "300.000 VND/2h",
      "extraHour": "70.000 VND/h",
      "overnight": "600.000 VND",
      "fullDay": "950.000 VND"
    },
    "conceptTitle": "Concept Độc Bản: Room - Oasis",
    "conceptDesc": "Private concept Master room 01 Đổi gió riêng tư 02 Setup chỉn chu Concept phòng Dịu dàng để thư giãn, đủ riêng tư để gần nhau hơn . Oasis lấy tông trắng làm chủ đạo, kết hợp ánh đèn vàng tạo nên cảm giác ấm áp và nhẹ nhàng. Giường tròn trắng, ghế treo và những đường nét mềm mại giúp không gian trở nên thoải mái, trong khi bồn tắm và ghế tình yêu mang đến thêm những trải nghiệm thú vị cho buổi hẹn. Trắng tinh khôi, ánh vàng ấm áp Sự kết hợp giữa nền trắng và ánh đèn vàng tạo cảm giác sạch sẽ, thư thái nhưng không đơn điệu. Oasis phù hợp với những cặp đôi muốn đổi gió trong một không gian nhẹ nhàng, riêng tư và vẫn có những điểm nhấn mới lạ. Nội thất Indochine Chi tiết gỗ, họa tiết và ánh sáng tạo cảm giác boutique, sang hơn một phòng nghỉ thông thường. Ghế S-curve Điểm nhấn trải nghiệm riêng của phòng, được bố trí trong tổng thể kín đáo và có gu. Tiện nghi đủ dùng Điều hòa, WiFi, TV giải trí và các tiện ích cơ bản cho thời gian nghỉ theo giờ hoặc qua đêm. Gọi tư vấn phòng Nhắn Zalo xem ảnh thật",
    "perks": [
      {
        "title": "Bồn tắm sục Jacuzzi đôi",
        "desc": "Không gian thư giãn đẳng cấp với bồn tắm sục lãng mạn, nước nóng ấm áp, bọt xà phòng hoa hồng."
      },
      {
        "title": "Ghế tình yêu Tantra cao cấp",
        "desc": "Đường cong công thái học chuẩn chỉn chu, mang đến cảm xúc thăng hoa bất tận cho cặp đôi."
      },
      {
        "title": "Máy chiếu phim Full HD / 4K",
        "desc": "Màn chiếu siêu rộng xem Netflix, YouTube, chill cùng bộ phim lãng mạn yêu thích."
      },
      {
        "title": "Ánh sáng nghệ thuật Mood Light",
        "desc": "Hệ thống đèn neon, trần ngàn sao và tone màu đa sắc tạo nên không khí quyến rũ độc bản."
      },
      {
        "title": "Miễn phí Cosplay & Đạo cụ",
        "desc": "Mượn trang phục hoá trang quyến rũ, đồ chơi tình yêu và Board Game gắn kết miễn phí."
      },
      {
        "title": "Bảo mật thông tin 100%",
        "desc": "Thủ tục check-in kín đáo, nhận phòng riêng tư, bảo vệ thông tin khách hàng tuyệt đối."
      }
    ],
    "faqs": [
      {
        "question": "Phòng Room - Oasis có sẵn bồn tắm và máy chiếu không?",
        "answer": "Phòng được trang bị đầy đủ tiện nghi cao cấp theo concept riêng, bao gồm bồn tắm thư giãn, ghế tình yêu Tantra, máy chiếu/Smart TV sắc nét và hệ thống đèn lãng mạn."
      },
      {
        "question": "Tôi có cần đặt cọc trước khi đến nhận phòng không?",
        "answer": "Nếu bạn đến trong vòng 15-20 phút, Mix Hotel sẽ giữ phòng miễn phí không cần cọc. Nếu bạn đặt trước nhiều giờ hoặc qua đêm, vui lòng cọc trước để đảm bảo phòng được giữ 100%."
      },
      {
        "question": "Mix Boutique Hotel có hỗ trợ trang trí tiệc kỷ niệm, sinh nhật không?",
        "answer": "Có! Mix Hotel có 4 gói decor chuyên nghiệp gồm nến, hoa hồng, bong bóng, bánh kem và rượu vang ngoại nhập. Hãy báo trước ít nhất 2-4 tiếng để nhân viên setup hoàn hảo nhất."
      },
      {
        "question": "Khách sạn có cho mượn đồ Cosplay và Board Game tình yêu không?",
        "answer": "Mix Hotel hoàn toàn miễn phí mượn trang phục Cosplay quyến rũ, phụ kiện BDSM tinh tế và bộ Board Game thử thách tình yêu cho tất cả khách hàng lưu trú."
      }
    ],
    "storyHtml": "\n<div class=\"container\">\n<div class=\"content-frame\">\n\n<div class=\"content-body size-1vw data_contents\">\n<p style=\"line-height:1.38; text-align:justify; margin-bottom:13px\">“Một ốc đảo bình yên giữa lòng thành phố.”</p>\n\n<p>Oasis mở ra bằng ánh sáng.</p>\n\n<p><img alt=\"oasis__1_.webp\" src=\"https://mixhotel.vn/uploads/images/62c55e78d6a5eb3785f6ee98/oasis__1_.webp\"></p>\n\n<p>Khác với những căn phòng rực đỏ của đam mê, nơi đây mang sắc trắng tinh khôi, những mảng gỗ ấm áp và cảm giác thư thái như một khu nghỉ dưỡng ven hồ. Ngay khi bước vào, bạn sẽ nghe thấy sự yên tĩnh.</p>\n\n<p><img alt=\"oasis__5_.webp\" src=\"https://mixhotel.vn/uploads/images/62c55e78d6a5eb3785f6ee9c/oasis__5_.webp\"></p>\n\n<p>Cửa sổ lớn mở ra toàn cảnh mặt hồ Đống Đa, nơi ánh nắng buổi sáng phản chiếu lấp lánh trên mặt nước và hoàng hôn buổi chiều nhuộm cả căn phòng bằng những gam màu dịu dàng.</p>\n\n<p><img alt=\"oasis__2_.webp\" src=\"https://mixhotel.vn/uploads/images/62c55e78d6a5eb3785f6ee99/oasis__2_.webp\"></p>\n\n<p>Bồn tắm gỗ đặt cạnh không gian mở tạo nên trải nghiệm nghỉ dưỡng đúng nghĩa. Hơi nước ấm, mùi gỗ nhẹ và khung cảnh hồ bên ngoài khiến mọi mệt mỏi tan đi từng chút một.</p>\n\n<p><img alt=\"oasis__4_.webp\" src=\"https://mixhotel.vn/uploads/images/62c55e78d6a5eb3785f6ee9b/oasis__4_.webp\"></p>\n\n<p>Khi đêm xuống, máy chiếu khổ lớn biến căn phòng thành rạp phim riêng của hai người. Một bộ phim yêu thích, vài món ăn nhẹ, tiếng cười khẽ và cảm giác thời gian trôi chậm hơn bình thường.</p>\n\n<p>Oasis dành cho những cặp đôi muốn nghỉ ngơi thật sự. Không cần quá nhiều cảm xúc bùng nổ, chỉ cần được ở cạnh nhau trong một không gian đẹp, sáng và bình yên.</p>\n\n<p><img alt=\"oasis__3_.webp\" src=\"https://mixhotel.vn/uploads/images/62c55e78d6a5eb3785f6ee9a/oasis__3_.webp\"></p>\n\n<p>Có những nơi để hẹn hò.</p>\n\n<p>Oasis là nơi để hồi phục năng lượng cho cả hai.</p>\n\n<p>Và đôi khi, điều lãng mạn nhất chính là được cùng nhau ngắm mặt hồ trong im lặng mà vẫn cảm thấy đủ đầy.&nbsp;</p>\n\n<p><img alt=\"oasis__6_.webp\" src=\"https://mixhotel.vn/uploads/images/62c55e78d6a5eb3785f6ee9d/oasis__6_.webp\"></p>\n\n</div>\n</div>\n</div>\n"
  },
  "kissing": {
    "slug": "kissing",
    "name": "Room - Kissing",
    "roomType": "Deluxe",
    "badge": "Deluxe Suite",
    "branchId": "branch-mix-boutique-hotel-256b-dang-tien-dong",
    "branchName": "Mix Boutique Hotel 256B Đặng Tiến Đông",
    "branchAddress": "256B Đặng Tiến Đông, Chợ Dừa, Đống Đa, Hà Nội",
    "branchPhone": "0383 104 010",
    "branchZalo": "https://zalo.me/0383104010",
    "heroImage": "/uploads/images/600bd1c98a159118a146eb45/kissing__3_.webp",
    "heroSubtitle": "Sắc đỏ rức cháy là điểm thu hút mạnh mẽ của căn phòng mang tên Kissing. Đến với Kissing, bạn sẽ được trải nghiệm những điều mới lạ và khoái cảm khi yêu. Giường tròn độc đáo với phòng cách quí tộc là nơi bạn cùng người ấy thoả sức lăn tròn ở một tầ...",
    "youtubeUrl": "",
    "galleryImages": [
      "/uploads/images/600bd1c98a159118a146eb45/kissing__3_.webp",
      "/uploads/images/62c567f4d6a5eb3785f6eecc/kissing__1_.webp",
      "/uploads/images/62c567f4d6a5eb3785f6eecd/kissing__2_.webp",
      "/uploads/images/62c567f4d6a5eb3785f6eece/kissing__3_.webp",
      "/uploads/images/62c567f4d6a5eb3785f6eecf/kissing__4_.webp",
      "/uploads/images/62c567f4d6a5eb3785f6eed0/kissing__5_.webp",
      "/uploads/images/62c567f4d6a5eb3785f6eed1/kissing__6_.webp",
      "/uploads/images/62c567f4d6a5eb3785f6eed2/kissing__7_.webp",
      "/uploads/images/62c567f4d6a5eb3785f6eed3/kissing__8_.webp",
      "/uploads/images/62c567f4d6a5eb3785f6eed4/kissing__9_.webp",
      "/uploads/images/62c567f4d6a5eb3785f6eed5/kissing__10_.webp",
      "/uploads/images/62c567f4d6a5eb3785f6eed6/kissing__11_.webp"
    ],
    "pricing": {
      "hourly": "300.000 VND/2h",
      "extraHour": "70.000 VND/h",
      "overnight": "600.000 VND",
      "fullDay": "950.000 VND"
    },
    "conceptTitle": "Concept Độc Bản: Room - Kissing",
    "conceptDesc": "Private concept Master room 01 Đổi gió riêng tư 02 Setup chỉn chu Concept phòng Đủ nồng nhiệt để đắm chìm, đủ riêng tư để tận hưởng . Kissing gây ấn tượng ngay với sắc đỏ rực cháy, kết hợp giường tròn phong cách quý tộc, bồn tắm sủi bọt và view ngắm toàn cảnh thành phố. Không gian mang cảm giác ấm cúng nhưng vẫn đầy cuốn hút, phù hợp cho những cặp đôi muốn một buổi hẹn nhiều cảm xúc. Sắc đỏ rực cháy Tông đỏ nổi bật tạo nên bầu không khí nồng nhiệt và quyến rũ. Kết hợp cùng giường tròn, bồn tắm và ánh sáng ấm, Kissing phù hợp với những cặp đôi muốn một buổi hẹn lãng mạn, táo bạo và khác biệt. Nội thất Indochine Chi tiết gỗ, họa tiết và ánh sáng tạo cảm giác boutique, sang hơn một phòng nghỉ thông thường. Ghế S-curve Điểm nhấn trải nghiệm riêng của phòng, được bố trí trong tổng thể kín đáo và có gu. Tiện nghi đủ dùng Điều hòa, WiFi, TV giải trí và các tiện ích cơ bản cho thời gian nghỉ theo giờ hoặc qua đêm. Gọi tư vấn phòng Nhắn Zalo xem ảnh thật",
    "perks": [
      {
        "title": "Bồn tắm sục Jacuzzi đôi",
        "desc": "Không gian thư giãn đẳng cấp với bồn tắm sục lãng mạn, nước nóng ấm áp, bọt xà phòng hoa hồng."
      },
      {
        "title": "Ghế tình yêu Tantra cao cấp",
        "desc": "Đường cong công thái học chuẩn chỉn chu, mang đến cảm xúc thăng hoa bất tận cho cặp đôi."
      },
      {
        "title": "Máy chiếu phim Full HD / 4K",
        "desc": "Màn chiếu siêu rộng xem Netflix, YouTube, chill cùng bộ phim lãng mạn yêu thích."
      },
      {
        "title": "Ánh sáng nghệ thuật Mood Light",
        "desc": "Hệ thống đèn neon, trần ngàn sao và tone màu đa sắc tạo nên không khí quyến rũ độc bản."
      },
      {
        "title": "Miễn phí Cosplay & Đạo cụ",
        "desc": "Mượn trang phục hoá trang quyến rũ, đồ chơi tình yêu và Board Game gắn kết miễn phí."
      },
      {
        "title": "Bảo mật thông tin 100%",
        "desc": "Thủ tục check-in kín đáo, nhận phòng riêng tư, bảo vệ thông tin khách hàng tuyệt đối."
      }
    ],
    "faqs": [
      {
        "question": "Phòng Room - Kissing có sẵn bồn tắm và máy chiếu không?",
        "answer": "Phòng được trang bị đầy đủ tiện nghi cao cấp theo concept riêng, bao gồm bồn tắm thư giãn, ghế tình yêu Tantra, máy chiếu/Smart TV sắc nét và hệ thống đèn lãng mạn."
      },
      {
        "question": "Tôi có cần đặt cọc trước khi đến nhận phòng không?",
        "answer": "Nếu bạn đến trong vòng 15-20 phút, Mix Hotel sẽ giữ phòng miễn phí không cần cọc. Nếu bạn đặt trước nhiều giờ hoặc qua đêm, vui lòng cọc trước để đảm bảo phòng được giữ 100%."
      },
      {
        "question": "Mix Boutique Hotel có hỗ trợ trang trí tiệc kỷ niệm, sinh nhật không?",
        "answer": "Có! Mix Hotel có 4 gói decor chuyên nghiệp gồm nến, hoa hồng, bong bóng, bánh kem và rượu vang ngoại nhập. Hãy báo trước ít nhất 2-4 tiếng để nhân viên setup hoàn hảo nhất."
      },
      {
        "question": "Khách sạn có cho mượn đồ Cosplay và Board Game tình yêu không?",
        "answer": "Mix Hotel hoàn toàn miễn phí mượn trang phục Cosplay quyến rũ, phụ kiện BDSM tinh tế và bộ Board Game thử thách tình yêu cho tất cả khách hàng lưu trú."
      }
    ],
    "storyHtml": "\n<div class=\"container\">\n<div class=\"content-frame\">\n\n<div class=\"content-body size-1vw data_contents\">\n<p style=\"line-height: 1.38; margin-bottom: 13px; text-align: justify;\">Có những căn phòng khiến bạn ngủ ngon.</p>\n\n<p style=\"text-align: justify;\">Kissing khiến bạn không muốn ngủ quá sớm.</p>\n\n<p style=\"text-align: justify;\"><iframe frameborder=\"0\" height=\"315\" src=\"https://www.youtube.com/embed/YH0YrqTaQAg\" width=\"560\"></iframe></p>\n\n<p style=\"line-height: 1.38; margin-bottom: 13px; text-align: justify;\">“Có những nụ hôn khiến cả căn phòng phải đỏ lên.”</p>\n\n<p style=\"text-align: justify;\">Kissing không biết cách trở nên nhẹ nhàng.</p>\n\n<p style=\"text-align: justify;\">Nó bước vào cảm xúc bằng sắc đỏ rực rỡ, bằng không gian rộng mở và bằng cảm giác rằng đêm nay mọi thứ đều được phép mãnh liệt hơn bình thường.</p>\n\n<p style=\"text-align: justify;\"><img alt=\"kissing__1_.webp\" src=\"https://mixhotel.vn/uploads/images/62c567f4d6a5eb3785f6eecc/kissing__1_.webp\">&nbsp;</p>\n\n<p style=\"text-align: justify;\">Chiếc giường tròn nhung đỏ cỡ lớn nằm giữa căn phòng như trái tim của toàn bộ trải nghiệm. Trên cao là trần gương, xung quanh là gương tường phản chiếu ánh đèn mềm mại, khiến từng khoảnh khắc trở nên sống động như những thước phim quay chậm.</p>\n\n<p style=\"text-align: justify;\"><img alt=\"kissing__2_.webp\" src=\"https://mixhotel.vn/uploads/images/62c567f4d6a5eb3785f6eecd/kissing__2_.webp\">&nbsp;</p>\n\n<p style=\"text-align: justify;\">Bồn tắm lớn đặt cạnh không gian mở, nơi hơi nước và ánh sáng hòa vào nhau tạo nên một bầu không khí vừa sang trọng vừa đầy cảm xúc. Chiếc ghế tình yêu là điểm nhấn táo bạo nhưng tinh tế, dành cho những cặp đôi muốn biến buổi hẹn thành một cuộc phiêu lưu riêng tư.</p>\n\n<p style=\"text-align: justify;\"><img alt=\"kissing__3_.webp\" src=\"https://mixhotel.vn/uploads/images/62c567f4d6a5eb3785f6eece/kissing__3_.webp\">&nbsp;</p>\n\n<p style=\"text-align: justify;\">Và rồi bức tường kính lớn mở ra mặt hồ Đống Đa.</p>\n\n<p style=\"text-align: justify;\">Ban đêm, ánh đèn từ thành phố phản chiếu trên mặt nước, tạo nên khung cảnh đẹp đến mức người ta chỉ muốn kéo rèm lại một nửa để vừa ngắm hồ, vừa giữ lại cảm giác riêng tư của căn phòng.</p>\n\n<p style=\"text-align: justify;\"><img alt=\"kissing__4_.webp\" src=\"https://mixhotel.vn/uploads/images/62c567f4d6a5eb3785f6eecf/kissing__4_.webp\">&nbsp;</p>\n\n<p style=\"text-align: justify;\">Kissing sinh ra cho những dịp đặc biệt: sinh nhật người yêu, kỷ niệm ngày yêu, cầu hôn, hoặc đơn giản là khi bạn muốn nói “hôm nay em/anh là điều duy nhất quan trọng”.</p>\n\n<p style=\"text-align: justify;\"><img alt=\"kissing__5_.webp\" src=\"https://mixhotel.vn/uploads/images/62c567f4d6a5eb3785f6eed0/kissing__5_.webp\">&nbsp;</p>\n\n<p style=\"text-align: justify;\"><img alt=\"kissing__6_.webp\" src=\"https://mixhotel.vn/uploads/images/62c567f4d6a5eb3785f6eed1/kissing__6_.webp\">&nbsp;</p>\n\n<p style=\"text-align: justify;\"><img alt=\"kissing__7_.webp\" src=\"https://mixhotel.vn/uploads/images/62c567f4d6a5eb3785f6eed2/kissing__7_.webp\">&nbsp;</p>\n\n<p style=\"text-align: justify;\"><img alt=\"kissing__8_.webp\" src=\"https://mixhotel.vn/uploads/images/62c567f4d6a5eb3785f6eed3/kissing__8_.webp\">&nbsp;</p>\n\n<p style=\"text-align: justify;\"><img alt=\"kissing__9_.webp\" src=\"https://mixhotel.vn/uploads/images/62c567f4d6a5eb3785f6eed4/kissing__9_.webp\">&nbsp;</p>\n\n<p style=\"text-align: justify;\"><img alt=\"kissing__10_.webp\" src=\"https://mixhotel.vn/uploads/images/62c567f4d6a5eb3785f6eed5/kissing__10_.webp\">&nbsp;</p>\n\n<p style=\"text-align: justify;\"><img alt=\"kissing__11_.webp\" src=\"https://mixhotel.vn/uploads/images/62c567f4d6a5eb3785f6eed6/kissing__11_.webp\"></p>\n\n</div>\n</div>\n</div>\n"
  },
  "lover": {
    "slug": "lover",
    "name": "VIP Room - Lover",
    "roomType": "VIP",
    "badge": "VIP Suite",
    "branchId": "branch-mix-boutique-hotel-256b-dang-tien-dong",
    "branchName": "Mix Boutique Hotel 256B Đặng Tiến Đông",
    "branchAddress": "256B Đặng Tiến Đông, Chợ Dừa, Đống Đa, Hà Nội",
    "branchPhone": "0383 104 010",
    "branchZalo": "https://zalo.me/0383104010",
    "heroImage": "/uploads/images/600bce438a159118a146eb32/lover__4_.webp",
    "heroSubtitle": "Sự kiều diễm và xa hoa là hai từ miêu tả trọn vẹn vẻ đẹp của căn phòng Lover. Lover có không gian mê hoặc tinh người với sắc đỏ xen lẫn vào đó là một chút trắng mờ ảo. Giường King size là nơi đắm chìm của mọi cảm xúc rực cháy và thắng hoa. Phòng t...",
    "youtubeUrl": "",
    "galleryImages": [
      "/uploads/images/600bce438a159118a146eb32/lover__4_.webp",
      "/uploads/images/62c56481d6a5eb3785f6eeba/lover__1_.webp",
      "/uploads/images/62c56481d6a5eb3785f6eebb/lover__2_.webp",
      "/uploads/images/62c56481d6a5eb3785f6eebc/lover__3_.webp",
      "/uploads/images/62c56481d6a5eb3785f6eebd/lover__4_.webp",
      "/storage/s2/x0/s2x0yclr2hn957oq6v9h5mnzyuyw_lover__1_.webp",
      "/storage/gb/kb/gbkbwn37y488hxc9eembv8xlsxuu_lover__2_.webp"
    ],
    "pricing": {
      "hourly": "400.000 VND/2h",
      "extraHour": "80.000 VND/h",
      "overnight": "750.000 VND",
      "fullDay": "1.200.000 VND"
    },
    "conceptTitle": "Concept Độc Bản: VIP Room - Lover",
    "conceptDesc": "Private concept Master room 01 Đổi gió riêng tư 02 Setup chỉn chu Concept phòng Sắc đỏ để say đắm, lãng mạn để gần nhau hơn . Lover gây ấn tượng với sắc đỏ quyến rũ xen trắng mờ ảo, kết hợp giường King Size, bồn tắm sang trọng và những đường nét mềm mại. Ghế tình yêu cùng view hướng hồ tạo thêm chiều sâu cho không gian, mang đến cảm giác vừa riêng tư, vừa gợi cảm cho buổi hẹn. Sắc đỏ quyến rũ Đỏ nổi bật, trắng mơ màng tạo nên sự tương phản vừa đủ để Lover trở nên cuốn hút mà không quá nặng nề. Căn phòng phù hợp với những cặp đôi muốn một buổi hẹn lãng mạn, sang trọng và có thêm chút táo bạo. Nội thất Indochine Chi tiết gỗ, họa tiết và ánh sáng tạo cảm giác boutique, sang hơn một phòng nghỉ thông thường. Ghế S-curve Điểm nhấn trải nghiệm riêng của phòng, được bố trí trong tổng thể kín đáo và có gu. Tiện nghi đủ dùng Điều hòa, WiFi, TV giải trí và các tiện ích cơ bản cho thời gian nghỉ theo giờ hoặc qua đêm. Gọi tư vấn phòng Nhắn Zalo xem ảnh thật",
    "perks": [
      {
        "title": "Bồn tắm sục Jacuzzi đôi",
        "desc": "Không gian thư giãn đẳng cấp với bồn tắm sục lãng mạn, nước nóng ấm áp, bọt xà phòng hoa hồng."
      },
      {
        "title": "Ghế tình yêu Tantra cao cấp",
        "desc": "Đường cong công thái học chuẩn chỉn chu, mang đến cảm xúc thăng hoa bất tận cho cặp đôi."
      },
      {
        "title": "Máy chiếu phim Full HD / 4K",
        "desc": "Màn chiếu siêu rộng xem Netflix, YouTube, chill cùng bộ phim lãng mạn yêu thích."
      },
      {
        "title": "Ánh sáng nghệ thuật Mood Light",
        "desc": "Hệ thống đèn neon, trần ngàn sao và tone màu đa sắc tạo nên không khí quyến rũ độc bản."
      },
      {
        "title": "Miễn phí Cosplay & Đạo cụ",
        "desc": "Mượn trang phục hoá trang quyến rũ, đồ chơi tình yêu và Board Game gắn kết miễn phí."
      },
      {
        "title": "Bảo mật thông tin 100%",
        "desc": "Thủ tục check-in kín đáo, nhận phòng riêng tư, bảo vệ thông tin khách hàng tuyệt đối."
      }
    ],
    "faqs": [
      {
        "question": "Phòng VIP Room - Lover có sẵn bồn tắm và máy chiếu không?",
        "answer": "Phòng được trang bị đầy đủ tiện nghi cao cấp theo concept riêng, bao gồm bồn tắm thư giãn, ghế tình yêu Tantra, máy chiếu/Smart TV sắc nét và hệ thống đèn lãng mạn."
      },
      {
        "question": "Tôi có cần đặt cọc trước khi đến nhận phòng không?",
        "answer": "Nếu bạn đến trong vòng 15-20 phút, Mix Hotel sẽ giữ phòng miễn phí không cần cọc. Nếu bạn đặt trước nhiều giờ hoặc qua đêm, vui lòng cọc trước để đảm bảo phòng được giữ 100%."
      },
      {
        "question": "Mix Boutique Hotel có hỗ trợ trang trí tiệc kỷ niệm, sinh nhật không?",
        "answer": "Có! Mix Hotel có 4 gói decor chuyên nghiệp gồm nến, hoa hồng, bong bóng, bánh kem và rượu vang ngoại nhập. Hãy báo trước ít nhất 2-4 tiếng để nhân viên setup hoàn hảo nhất."
      },
      {
        "question": "Khách sạn có cho mượn đồ Cosplay và Board Game tình yêu không?",
        "answer": "Mix Hotel hoàn toàn miễn phí mượn trang phục Cosplay quyến rũ, phụ kiện BDSM tinh tế và bộ Board Game thử thách tình yêu cho tất cả khách hàng lưu trú."
      }
    ],
    "storyHtml": "\n<div class=\"container\">\n<div class=\"content-frame\">\n\n<div class=\"content-body size-1vw data_contents\">\n<p style=\"text-align:center\"><img alt=\"lover__1_.webp\" src=\"https://mixhotel.vn/uploads/images/62c56481d6a5eb3785f6eeba/lover__1_.webp\">&nbsp;</p>\n\n<p style=\"text-align:center\"><img alt=\"lover__2_.webp\" src=\"https://mixhotel.vn/uploads/images/62c56481d6a5eb3785f6eebb/lover__2_.webp\">&nbsp;</p>\n\n<p style=\"text-align:center\"><img alt=\"lover__3_.webp\" src=\"https://mixhotel.vn/uploads/images/62c56481d6a5eb3785f6eebc/lover__3_.webp\">&nbsp;</p>\n\n<p style=\"text-align:center\"><img alt=\"lover__4_.webp\" src=\"https://mixhotel.vn/uploads/images/62c56481d6a5eb3785f6eebd/lover__4_.webp\"></p>\n</div>\n</div>\n</div>\n"
  },
  "on-top": {
    "slug": "on-top",
    "name": "VIP Room - On Top",
    "roomType": "VIP",
    "badge": "VIP Suite",
    "branchId": "branch-mix-boutique-hotel-256b-dang-tien-dong",
    "branchName": "Mix Boutique Hotel 256B Đặng Tiến Đông",
    "branchAddress": "256B Đặng Tiến Đông, Chợ Dừa, Đống Đa, Hà Nội",
    "branchPhone": "0383 104 010",
    "branchZalo": "https://zalo.me/0383104010",
    "heroImage": "/uploads/images/600bd4b68a159118a146eb5b/on-top__8_.webp",
    "heroSubtitle": "Tình như chốn thiêng đường chỉ có tại căn phòng mang tên On Top. Mang phong cách của một Maldives thu nhỏ lãng mạn và phong tình. Chiếc giường với thiết kế độc đáo là nơi chiến trường tình ái sẽ xảy ra. Bồn tăm hiện đại giúp thăng hoa mọi cảm xúc ...",
    "youtubeUrl": "",
    "galleryImages": [
      "/uploads/images/600bd4b68a159118a146eb5b/on-top__8_.webp",
      "/uploads/images/62c56c1bd6a5eb3785f6eee4/on-top__1_.webp",
      "/uploads/images/62c56c1bd6a5eb3785f6eee5/on-top__2_.webp",
      "/uploads/images/62c56c1bd6a5eb3785f6eee6/on-top__3_.webp",
      "/uploads/images/62c56c1bd6a5eb3785f6eee7/on-top__4_.webp",
      "/uploads/images/62c56c1bd6a5eb3785f6eee8/on-top__5_.webp",
      "/uploads/images/62c56c1bd6a5eb3785f6eee9/on-top__6_.webp",
      "/uploads/images/62c56c1bd6a5eb3785f6eeea/on-top__7_.webp",
      "/uploads/images/62c56c1bd6a5eb3785f6eeeb/on-top__8_.webp",
      "/storage/m6/1a/m61aet8k9341zo3yvwosqo3awb9q_on-top__1_.webp",
      "/storage/n6/4u/n64ubv4hy5sw66kdh8bj5sbiqko1_on-top__4_.webp"
    ],
    "pricing": {
      "hourly": "400.000 VND/2h",
      "extraHour": "80.000 VND/h",
      "overnight": "750.000 VND",
      "fullDay": "1.200.000 VND"
    },
    "conceptTitle": "Concept Độc Bản: VIP Room - On Top",
    "conceptDesc": "Private concept Master room 01 Đổi gió riêng tư 02 Setup chỉn chu Concept phòng Đủ riêng tư để thả mình, đủ khác biệt để tạo nên một buổi hẹn đáng nhớ . On Top mang phong cách Maldives thu nhỏ, kết hợp không gian ấm cúng với giường tròn thiết kế độc đáo, bồn tắm hiện đại và góc view ấn tượng. Tổng thể tạo cảm giác vừa lãng mạn, vừa phóng khoáng, phù hợp cho những cặp đôi muốn đổi gió trong một không gian riêng tư. Maldives thu nhỏ giữa lòng Hà Nội Không gian ấm áp, giường tròn độc đáo và bồn tắm thư giãn tạo nên nét riêng cho On Top. Căn phòng phù hợp với những cặp đôi muốn một buổi hẹn lãng mạn, mới lạ và có thêm cảm giác nghỉ dưỡng. Nội thất Indochine Chi tiết gỗ, họa tiết và ánh sáng tạo cảm giác boutique, sang hơn một phòng nghỉ thông thường. Ghế S-curve Điểm nhấn trải nghiệm riêng của phòng, được bố trí trong tổng thể kín đáo và có gu. Tiện nghi đủ dùng Điều hòa, WiFi, TV giải trí và các tiện ích cơ bản cho thời gian nghỉ theo giờ hoặc qua đêm. Gọi tư vấn phòng Nhắn Zalo xem ảnh thật",
    "perks": [
      {
        "title": "Bồn tắm sục Jacuzzi đôi",
        "desc": "Không gian thư giãn đẳng cấp với bồn tắm sục lãng mạn, nước nóng ấm áp, bọt xà phòng hoa hồng."
      },
      {
        "title": "Ghế tình yêu Tantra cao cấp",
        "desc": "Đường cong công thái học chuẩn chỉn chu, mang đến cảm xúc thăng hoa bất tận cho cặp đôi."
      },
      {
        "title": "Máy chiếu phim Full HD / 4K",
        "desc": "Màn chiếu siêu rộng xem Netflix, YouTube, chill cùng bộ phim lãng mạn yêu thích."
      },
      {
        "title": "Ánh sáng nghệ thuật Mood Light",
        "desc": "Hệ thống đèn neon, trần ngàn sao và tone màu đa sắc tạo nên không khí quyến rũ độc bản."
      },
      {
        "title": "Miễn phí Cosplay & Đạo cụ",
        "desc": "Mượn trang phục hoá trang quyến rũ, đồ chơi tình yêu và Board Game gắn kết miễn phí."
      },
      {
        "title": "Bảo mật thông tin 100%",
        "desc": "Thủ tục check-in kín đáo, nhận phòng riêng tư, bảo vệ thông tin khách hàng tuyệt đối."
      }
    ],
    "faqs": [
      {
        "question": "Phòng VIP Room - On Top có sẵn bồn tắm và máy chiếu không?",
        "answer": "Phòng được trang bị đầy đủ tiện nghi cao cấp theo concept riêng, bao gồm bồn tắm thư giãn, ghế tình yêu Tantra, máy chiếu/Smart TV sắc nét và hệ thống đèn lãng mạn."
      },
      {
        "question": "Tôi có cần đặt cọc trước khi đến nhận phòng không?",
        "answer": "Nếu bạn đến trong vòng 15-20 phút, Mix Hotel sẽ giữ phòng miễn phí không cần cọc. Nếu bạn đặt trước nhiều giờ hoặc qua đêm, vui lòng cọc trước để đảm bảo phòng được giữ 100%."
      },
      {
        "question": "Mix Boutique Hotel có hỗ trợ trang trí tiệc kỷ niệm, sinh nhật không?",
        "answer": "Có! Mix Hotel có 4 gói decor chuyên nghiệp gồm nến, hoa hồng, bong bóng, bánh kem và rượu vang ngoại nhập. Hãy báo trước ít nhất 2-4 tiếng để nhân viên setup hoàn hảo nhất."
      },
      {
        "question": "Khách sạn có cho mượn đồ Cosplay và Board Game tình yêu không?",
        "answer": "Mix Hotel hoàn toàn miễn phí mượn trang phục Cosplay quyến rũ, phụ kiện BDSM tinh tế và bộ Board Game thử thách tình yêu cho tất cả khách hàng lưu trú."
      }
    ],
    "storyHtml": "\n<div class=\"container\">\n<div class=\"content-frame\">\n\n<div class=\"content-body size-1vw data_contents\">\n<p style=\"line-height:1.38; text-align:justify; margin-bottom:13px\">“Khi ở trên cao, mọi cảm xúc cũng trở nên khác đi.”</p>\n\n<p>On Top là căn phòng dành cho những người muốn nhìn thành phố từ một góc hoàn toàn khác.</p>\n\n<p><iframe frameborder=\"0\" height=\"315\" src=\"https://www.youtube.com/embed/K2qqvohdzjw\" width=\"560\"></iframe></p>\n\n<p><iframe frameborder=\"0\" height=\"315\" src=\"https://www.youtube.com/embed/srf0f79ufl8\" width=\"560\"></iframe></p>\n\n<p>Nằm ở tầng áp mái với thiết kế mái chéo đặc trưng, toàn bộ không gian được ốp gỗ tạo nên cảm giác ấm áp như một căn chalet riêng giữa trời cao. Nhưng điều khiến On Top trở thành phòng biểu tượng chính là view trọn hồ Đống Đa mở ra trước mắt như một bức tranh điện ảnh.</p>\n\n<p><img alt=\"on-top__1_.webp\" src=\"https://mixhotel.vn/uploads/images/62c56c1bd6a5eb3785f6eee4/on-top__1_.webp\">&nbsp;</p>\n\n<p>Buổi chiều, ánh hoàng hôn nhuộm mặt hồ bằng sắc vàng cam. Buổi tối, hàng nghìn ánh đèn phản chiếu trên mặt nước, khiến khung cảnh trở nên yên tĩnh và sang trọng đến khó tin.</p>\n\n<p>Bồn tắm lớn được đặt để bạn có thể vừa ngâm mình trong làn nước ấm, vừa ngắm toàn bộ thành phố phía dưới. Khoảnh khắc ấy có cảm giác như mọi ồn ào đã bị bỏ lại rất xa.</p>\n\n<p><img alt=\"on-top__2_.webp\" src=\"https://mixhotel.vn/uploads/images/62c56c1bd6a5eb3785f6eee5/on-top__2_.webp\">&nbsp;</p>\n\n<p>On Top không cần quá nhiều chi tiết táo bạo. Sức hút của nó nằm ở cảm giác được “nâng lên cao hơn” – cao hơn về không gian, cao hơn về cảm xúc, và cao hơn cả những buổi hẹn thông thường.</p>\n\n<p><img alt=\"on-top__3_.webp\" src=\"https://mixhotel.vn/uploads/images/62c56c1bd6a5eb3785f6eee6/on-top__3_.webp\">&nbsp;</p>\n\n<p>Đây là căn phòng lý tưởng cho các cặp đôi muốn nghỉ dưỡng thực sự: cuối tuần thư giãn, kỷ niệm đặc biệt, hoặc đơn giản là tự thưởng cho nhau một đêm thật đẹp.</p>\n\n<p>Có những khách sạn cho bạn một căn phòng.</p>\n\n<p>On Top cho bạn cả bầu trời và mặt hồ dưới chân mình.</p>\n\n<p><img alt=\"on-top__4_.webp\" src=\"https://mixhotel.vn/uploads/images/62c56c1bd6a5eb3785f6eee7/on-top__4_.webp\">&nbsp;</p>\n\n<p><img alt=\"on-top__5_.webp\" src=\"https://mixhotel.vn/uploads/images/62c56c1bd6a5eb3785f6eee8/on-top__5_.webp\">&nbsp;</p>\n\n<p><img alt=\"on-top__6_.webp\" src=\"https://mixhotel.vn/uploads/images/62c56c1bd6a5eb3785f6eee9/on-top__6_.webp\">&nbsp;<img alt=\"on-top__7_.webp\" src=\"https://mixhotel.vn/uploads/images/62c56c1bd6a5eb3785f6eeea/on-top__7_.webp\">&nbsp;</p>\n\n<p><img alt=\"on-top__8_.webp\" src=\"https://mixhotel.vn/uploads/images/62c56c1bd6a5eb3785f6eeeb/on-top__8_.webp\"></p>\n\n</div>\n</div>\n</div>\n"
  },
  "naive": {
    "slug": "naive",
    "name": "Room - Naive",
    "roomType": "Superior",
    "badge": "Superior Suite",
    "branchId": "branch-mix-boutique-hotel-20-phuc-la-ha-dong",
    "branchName": "Mix Boutique Hotel 20 Phúc La Hà Đông",
    "branchAddress": "20, P. Phúc La, Hà Đông, Hà Nội",
    "branchPhone": "0383 104 010",
    "branchZalo": "https://zalo.me/0383104010",
    "heroImage": "/uploads/images/606eb8a88a15917d2a0cdb34/naive1.webp",
    "heroSubtitle": "Những chú nai nhỏ bé ngơ ngác đang mở to đôi mắt tròn ngây thơ, như mời gọi và chờ đợi những chàng thợ săn thuần thục để được cùng nhau chơi trò TRỐN TÌM giữa con mồi và kẻ săn mồi. Hỡi các anh chàng thợ săn lão luyện, hãy chuẩn bị cho mình một ch...",
    "youtubeUrl": "",
    "galleryImages": [
      "/uploads/images/606eb8a88a15917d2a0cdb34/naive1.webp",
      "/uploads/images/60bc52388a15913d6bdc816d/1_DSC3421.jpg",
      "/uploads/images/60bc52388a15913d6bdc816e/1_DSC3427.jpg",
      "/uploads/images/60bc52388a15913d6bdc816f/1_DSC3438.jpg",
      "/uploads/images/60bc52388a15913d6bdc8170/1_DSC3470.jpg",
      "/uploads/images/60bc52388a15913d6bdc8171/1TN20210518_210132.jpg",
      "/uploads/images/60bc52388a15913d6bdc8172/1TNT00148.jpg",
      "/uploads/images/60bc52388a15913d6bdc8173/1TNT00152.jpg",
      "/uploads/images/60bc52388a15913d6bdc8174/1TNT00153.jpg",
      "/uploads/images/60bc52388a15913d6bdc8175/1TNT00154.jpg",
      "/uploads/images/60bc52388a15913d6bdc8176/1TNT00157.jpg",
      "/uploads/images/60bc52388a15913d6bdc8177/1TNT00158.jpg"
    ],
    "pricing": {
      "hourly": "199.000 VND/2h",
      "extraHour": "60.000 VND/h",
      "overnight": "500.000 VND",
      "fullDay": "800.000 VND"
    },
    "conceptTitle": "Concept Độc Bản: Room - Naive",
    "conceptDesc": "Private concept Master room 01 Đổi gió riêng tư 02 Setup chỉn chu Concept phòng Đủ lạ để đổi gió, đủ tinh tế để vẫn thoải mái. Master n Slave không đi theo kiểu trang trí quá ồn. Cảm giác chính là nền đỏ đen ấm, chi tiết Indochine, ánh sáng có chiều sâu và một điểm nhấn S-curve để buổi hẹn có thêm trải nghiệm mới. Tổng đỏ đen huyền bí Không gian có độ tương phản mạnh, hợp những cặp đôi muốn một buổi hẹn khác nhịp thường ngày. Nội thất Indochine Chi tiết gỗ, họa tiết và ánh sáng tạo cảm giác boutique, sang hơn một phòng nghỉ thông thường. Ghế S-curve Điểm nhấn trải nghiệm riêng của phòng, được bố trí trong tổng thể kín đáo và có gu. Tiện nghi đủ dùng Điều hòa, WiFi, TV giải trí và các tiện ích cơ bản cho thời gian nghỉ theo giờ hoặc qua đêm. Gọi tư vấn phòng Nhắn Zalo xem ảnh thật",
    "perks": [
      {
        "title": "Bồn tắm sục Jacuzzi đôi",
        "desc": "Không gian thư giãn đẳng cấp với bồn tắm sục lãng mạn, nước nóng ấm áp, bọt xà phòng hoa hồng."
      },
      {
        "title": "Ghế tình yêu Tantra cao cấp",
        "desc": "Đường cong công thái học chuẩn chỉn chu, mang đến cảm xúc thăng hoa bất tận cho cặp đôi."
      },
      {
        "title": "Máy chiếu phim Full HD / 4K",
        "desc": "Màn chiếu siêu rộng xem Netflix, YouTube, chill cùng bộ phim lãng mạn yêu thích."
      },
      {
        "title": "Ánh sáng nghệ thuật Mood Light",
        "desc": "Hệ thống đèn neon, trần ngàn sao và tone màu đa sắc tạo nên không khí quyến rũ độc bản."
      },
      {
        "title": "Miễn phí Cosplay & Đạo cụ",
        "desc": "Mượn trang phục hoá trang quyến rũ, đồ chơi tình yêu và Board Game gắn kết miễn phí."
      },
      {
        "title": "Bảo mật thông tin 100%",
        "desc": "Thủ tục check-in kín đáo, nhận phòng riêng tư, bảo vệ thông tin khách hàng tuyệt đối."
      }
    ],
    "faqs": [
      {
        "question": "Phòng Room - Naive có sẵn bồn tắm và máy chiếu không?",
        "answer": "Phòng được trang bị đầy đủ tiện nghi cao cấp theo concept riêng, bao gồm bồn tắm thư giãn, ghế tình yêu Tantra, máy chiếu/Smart TV sắc nét và hệ thống đèn lãng mạn."
      },
      {
        "question": "Tôi có cần đặt cọc trước khi đến nhận phòng không?",
        "answer": "Nếu bạn đến trong vòng 15-20 phút, Mix Hotel sẽ giữ phòng miễn phí không cần cọc. Nếu bạn đặt trước nhiều giờ hoặc qua đêm, vui lòng cọc trước để đảm bảo phòng được giữ 100%."
      },
      {
        "question": "Mix Boutique Hotel có hỗ trợ trang trí tiệc kỷ niệm, sinh nhật không?",
        "answer": "Có! Mix Hotel có 4 gói decor chuyên nghiệp gồm nến, hoa hồng, bong bóng, bánh kem và rượu vang ngoại nhập. Hãy báo trước ít nhất 2-4 tiếng để nhân viên setup hoàn hảo nhất."
      },
      {
        "question": "Khách sạn có cho mượn đồ Cosplay và Board Game tình yêu không?",
        "answer": "Mix Hotel hoàn toàn miễn phí mượn trang phục Cosplay quyến rũ, phụ kiện BDSM tinh tế và bộ Board Game thử thách tình yêu cho tất cả khách hàng lưu trú."
      }
    ],
    "storyHtml": "\n<div class=\"container\">\n<div class=\"content-frame\">\n\n<div class=\"content-body size-1vw data_contents\">\n<p><img alt=\"\" src=\"/uploads/pictures/60bc51df8a15913d6bdc8161/content_1_DSC3421.jpg\" style=\"height:533px; width:800px\"></p>\n\n<p><img alt=\"\" src=\"/uploads/pictures/60bc51df8a15913d6bdc8160/content_1_DSC3438.jpg\" style=\"height:800px; width:568px\"></p>\n\n<p><img alt=\"\" src=\"/uploads/pictures/60bc51df8a15913d6bdc8161/content_1_DSC3421.jpg\" style=\"height:533px; width:800px\"></p>\n\n<p><img alt=\"\" src=\"/uploads/pictures/60bc51e18a15913d6bdc8162/content_1TN20210518_210132.jpg\" style=\"height:800px; width:616px\"></p>\n\n<p><img alt=\"\" src=\"/uploads/pictures/60bc51e18a15913d6bdc8163/content_1_DSC3470.jpg\" style=\"height:800px; width:609px\"></p>\n\n<p><img alt=\"\" src=\"/uploads/pictures/60bc51e28a15913d6bdc8164/content_1TNT00148.jpg\" style=\"height:575px; width:800px\"></p>\n\n<p><img alt=\"\" src=\"/uploads/pictures/60bc51e28a15913d6bdc8165/content_1TNT00152.jpg\" style=\"height:533px; width:800px\"></p>\n\n<p><img alt=\"\" src=\"/uploads/pictures/60bc51e48a15913d6bdc8166/content_1TNT00153.jpg\" style=\"height:534px; width:800px\"></p>\n\n<p><img alt=\"\" src=\"/uploads/pictures/60bc51e68a15913d6bdc8167/content_1TNT00157.jpg\" style=\"height:533px; width:800px\"></p>\n\n<p><img alt=\"\" src=\"/uploads/pictures/60bc51e68a15913d6bdc8168/content_1TNT00154.jpg\" style=\"height:533px; width:800px\"></p>\n\n<p><img alt=\"\" src=\"/uploads/pictures/60bc51e88a15913d6bdc8169/content_1TNT00159.jpg\" style=\"height:653px; width:800px\"></p>\n\n<p><img alt=\"\" src=\"/uploads/pictures/60bc51e88a15913d6bdc816a/content_1TNT00158.jpg\" style=\"height:800px; width:534px\"></p>\n\n<p><img alt=\"\" src=\"/uploads/pictures/60bc51e88a15913d6bdc816b/content_1TNT00160.jpg\" style=\"height:583px; width:800px\"></p>\n\n<p><img alt=\"\" src=\"/uploads/pictures/60bc51e98a15913d6bdc816c/content_1TNT00161.jpg\" style=\"height:534px; width:800px\"></p>\n</div>\n</div>\n</div>\n"
  },
  "confession": {
    "slug": "confession",
    "name": "Room - Confession",
    "roomType": "Superior",
    "badge": "Superior Suite",
    "branchId": "branch-mix-boutique-hotel-20-phuc-la-ha-dong",
    "branchName": "Mix Boutique Hotel 20 Phúc La Hà Đông",
    "branchAddress": "20, P. Phúc La, Hà Đông, Hà Nội",
    "branchPhone": "0383 104 010",
    "branchZalo": "https://zalo.me/0383104010",
    "heroImage": "/uploads/images/60bc5b128a15913d6bdc81c0/confession.webp",
    "heroSubtitle": "Những lời thú tội đôi khi không dễ để diễn đạt bằng lời phải không nào? vậy thì Căn phòng Thú tội tại Mix đã sẵn sàng các để các bad boy dùng hành động chịu phạt thay cho lời thú tội rồi đây! Các chàng trai đã sẵn sàng đón nhận sự trừng phạt ngọt ...",
    "youtubeUrl": "",
    "galleryImages": [
      "/uploads/images/60bc5b128a15913d6bdc81c0/confession.webp",
      "/uploads/images/60bc5b128a15913d6bdc81c1/1_DSC3493.jpg",
      "/uploads/images/60bc5b128a15913d6bdc81c2/1_DSC3494.jpg",
      "/uploads/images/60bc5b128a15913d6bdc81c3/1TNT00165.jpg",
      "/uploads/images/60bc5b128a15913d6bdc81c4/1TNT00166.jpg",
      "/uploads/images/60bc5b128a15913d6bdc81c5/1TNT00167.jpg",
      "/uploads/images/60bc5b128a15913d6bdc81c6/1TNT00168.jpg",
      "/uploads/images/60bc5b128a15913d6bdc81c7/1TNT00170.jpg",
      "/uploads/images/60bc5b128a15913d6bdc81c8/1TNT00171.jpg",
      "/uploads/images/60bc5b128a15913d6bdc81c9/1TNT00172.jpg",
      "/uploads/images/60bc5b128a15913d6bdc81ca/1TNT00173.jpg",
      "/uploads/images/60bc5b128a15913d6bdc81cb/1TNT00174.jpg"
    ],
    "pricing": {
      "hourly": "199.000 VND/2h",
      "extraHour": "60.000 VND/h",
      "overnight": "500.000 VND",
      "fullDay": "800.000 VND"
    },
    "conceptTitle": "Concept Độc Bản: Room - Confession",
    "conceptDesc": "Private concept Master room 01 Đổi gió riêng tư 02 Setup chỉn chu Concept phòng Đủ lạ để đổi gió, đủ tinh tế để vẫn thoải mái. Master n Slave không đi theo kiểu trang trí quá ồn. Cảm giác chính là nền đỏ đen ấm, chi tiết Indochine, ánh sáng có chiều sâu và một điểm nhấn S-curve để buổi hẹn có thêm trải nghiệm mới. Tổng đỏ đen huyền bí Không gian có độ tương phản mạnh, hợp những cặp đôi muốn một buổi hẹn khác nhịp thường ngày. Nội thất Indochine Chi tiết gỗ, họa tiết và ánh sáng tạo cảm giác boutique, sang hơn một phòng nghỉ thông thường. Ghế S-curve Điểm nhấn trải nghiệm riêng của phòng, được bố trí trong tổng thể kín đáo và có gu. Tiện nghi đủ dùng Điều hòa, WiFi, TV giải trí và các tiện ích cơ bản cho thời gian nghỉ theo giờ hoặc qua đêm. Gọi tư vấn phòng Nhắn Zalo xem ảnh thật",
    "perks": [
      {
        "title": "Bồn tắm sục Jacuzzi đôi",
        "desc": "Không gian thư giãn đẳng cấp với bồn tắm sục lãng mạn, nước nóng ấm áp, bọt xà phòng hoa hồng."
      },
      {
        "title": "Ghế tình yêu Tantra cao cấp",
        "desc": "Đường cong công thái học chuẩn chỉn chu, mang đến cảm xúc thăng hoa bất tận cho cặp đôi."
      },
      {
        "title": "Máy chiếu phim Full HD / 4K",
        "desc": "Màn chiếu siêu rộng xem Netflix, YouTube, chill cùng bộ phim lãng mạn yêu thích."
      },
      {
        "title": "Ánh sáng nghệ thuật Mood Light",
        "desc": "Hệ thống đèn neon, trần ngàn sao và tone màu đa sắc tạo nên không khí quyến rũ độc bản."
      },
      {
        "title": "Miễn phí Cosplay & Đạo cụ",
        "desc": "Mượn trang phục hoá trang quyến rũ, đồ chơi tình yêu và Board Game gắn kết miễn phí."
      },
      {
        "title": "Bảo mật thông tin 100%",
        "desc": "Thủ tục check-in kín đáo, nhận phòng riêng tư, bảo vệ thông tin khách hàng tuyệt đối."
      }
    ],
    "faqs": [
      {
        "question": "Phòng Room - Confession có sẵn bồn tắm và máy chiếu không?",
        "answer": "Phòng được trang bị đầy đủ tiện nghi cao cấp theo concept riêng, bao gồm bồn tắm thư giãn, ghế tình yêu Tantra, máy chiếu/Smart TV sắc nét và hệ thống đèn lãng mạn."
      },
      {
        "question": "Tôi có cần đặt cọc trước khi đến nhận phòng không?",
        "answer": "Nếu bạn đến trong vòng 15-20 phút, Mix Hotel sẽ giữ phòng miễn phí không cần cọc. Nếu bạn đặt trước nhiều giờ hoặc qua đêm, vui lòng cọc trước để đảm bảo phòng được giữ 100%."
      },
      {
        "question": "Mix Boutique Hotel có hỗ trợ trang trí tiệc kỷ niệm, sinh nhật không?",
        "answer": "Có! Mix Hotel có 4 gói decor chuyên nghiệp gồm nến, hoa hồng, bong bóng, bánh kem và rượu vang ngoại nhập. Hãy báo trước ít nhất 2-4 tiếng để nhân viên setup hoàn hảo nhất."
      },
      {
        "question": "Khách sạn có cho mượn đồ Cosplay và Board Game tình yêu không?",
        "answer": "Mix Hotel hoàn toàn miễn phí mượn trang phục Cosplay quyến rũ, phụ kiện BDSM tinh tế và bộ Board Game thử thách tình yêu cho tất cả khách hàng lưu trú."
      }
    ],
    "storyHtml": "\n<div class=\"container\">\n<div class=\"content-frame\">\n\n<div class=\"content-body size-1vw data_contents\">\n<p><img alt=\"Khách sạn tình yêu - Confession\" src=\"/uploads/pictures/60bc5a9e8a15913d6bdc81b0/content_1_DSC3493.jpg\" style=\"height:532px; width:800px\"></p>\n\n<p><img alt=\"Khách sạn tình yêu - Confession\" src=\"/uploads/pictures/60bc5a9e8a15913d6bdc81af/content_1_DSC3494.jpg\" style=\"height:800px; width:532px\"></p>\n\n<p><img alt=\"Khách sạn tình yêu - Confession\" src=\"/uploads/pictures/60bc5a9e8a15913d6bdc81b1/content_1TNT00165.jpg\" style=\"height:533px; width:800px\"></p>\n\n<p><img alt=\"Khách sạn tình yêu - Confession\" src=\"/uploads/pictures/60bc5a9f8a15913d6bdc81b2/content_1TNT00166.jpg\" style=\"height:800px; width:533px\"></p>\n\n<p><img alt=\"Khách sạn tình yêu - Confession\" src=\"/uploads/pictures/60bc5aa08a15913d6bdc81b3/content_1TNT00167.jpg\" style=\"height:535px; width:800px\"></p>\n\n<p><img alt=\"Khách sạn tình yêu - Confession\" src=\"/uploads/pictures/60bc5aa08a15913d6bdc81b4/content_1TNT00168.jpg\" style=\"height:800px; width:533px\"></p>\n\n<p><img alt=\"Khách sạn tình yêu - Confession\" src=\"/uploads/pictures/60bc5aa08a15913d6bdc81b5/content_1TNT00170.jpg\" style=\"height:535px; width:800px\"></p>\n\n<p><img alt=\"Khách sạn tình yêu - Confession\" src=\"/uploads/pictures/60bc5aa18a15913d6bdc81b6/content_1TNT00171.jpg\" style=\"height:535px; width:800px\"></p>\n\n<p><img alt=\"Khách sạn tình yêu - Confession\" src=\"/uploads/pictures/60bc5aa28a15913d6bdc81b7/content_1TNT00173.jpg\" style=\"height:624px; width:800px\"></p>\n\n<p><img alt=\"Khách sạn tình yêu - Confession\" src=\"/uploads/pictures/60bc5aa28a15913d6bdc81b8/content_1TNT00172.jpg\" style=\"height:532px; width:800px\"></p>\n\n<p><img alt=\"Khách sạn tình yêu - Confession\" src=\"/uploads/pictures/60bc5aa28a15913d6bdc81b9/content_1TNT00174.jpg\" style=\"height:800px; width:533px\"></p>\n\n<p><img alt=\"Khách sạn tình yêu - Confession\" src=\"/uploads/pictures/60bc5aa48a15913d6bdc81ba/content_1TNT00178.jpg\" style=\"height:533px; width:800px\"></p>\n\n<p><img alt=\"Khách sạn tình yêu - Confession\" src=\"/uploads/pictures/60bc5aa48a15913d6bdc81bb/content_1TNT00176.jpg\" style=\"height:534px; width:800px\"></p>\n\n<p><img alt=\"Khách sạn tình yêu - Confession\" src=\"/uploads/pictures/60bc5aa48a15913d6bdc81bc/content_1TNT00179.jpg\" style=\"height:535px; width:800px\"></p>\n\n<p><img alt=\"Khách sạn tình yêu - Confession\" src=\"/uploads/pictures/60bc5aa58a15913d6bdc81bd/content_1TNT00180.jpg\" style=\"height:677px; width:800px\"></p>\n\n<p><img alt=\"Khách sạn tình yêu - Confession\" src=\"/uploads/pictures/60bc5aa58a15913d6bdc81be/content_1TNT00181.jpg\" style=\"height:800px; width:629px\"></p>\n\n<p><img alt=\"Khách sạn tình yêu - Confession\" src=\"/uploads/pictures/60bc5aa58a15913d6bdc81bf/content_1TNT00182.jpg\" style=\"height:535px; width:800px\"></p>\n</div>\n</div>\n</div>\n"
  },
  "hollywood": {
    "slug": "hollywood",
    "name": "Room - Holywood",
    "roomType": "Superior",
    "badge": "Superior Suite",
    "branchId": "branch-mix-boutique-hotel-20-phuc-la-ha-dong",
    "branchName": "Mix Boutique Hotel 20 Phúc La Hà Đông",
    "branchAddress": "20, P. Phúc La, Hà Đông, Hà Nội",
    "branchPhone": "0383 104 010",
    "branchZalo": "https://zalo.me/0383104010",
    "heroImage": "/uploads/images/60bc5ce38a15913d6bdc81e1/holywood.webp",
    "heroSubtitle": "Em có một ước mơ về nước Mỹ - buổi tối chúng tôi sẽ lái xe đến rạp chiếu phim ngoài trời, em vừa có thể xem một bộ phim tình cảm lãng mạn vừa có thể ngắm những ánh sao đêm! Và tôi vừa đưa em đến Hollywood để thực hiện giấc mơ xem phim màn ảnh siêu...",
    "youtubeUrl": "",
    "galleryImages": [
      "/uploads/images/60bc5ce38a15913d6bdc81e1/holywood.webp",
      "/uploads/images/60bc5ce38a15913d6bdc81e2/1TNT00185.jpg",
      "/uploads/images/60bc5ce38a15913d6bdc81e3/1TNT00188.jpg",
      "/uploads/images/60bc5ce38a15913d6bdc81e4/1TNT00190.jpg",
      "/uploads/images/60bc5ce38a15913d6bdc81e5/1TNT00191.jpg",
      "/uploads/images/60bc5ce38a15913d6bdc81e6/1TNT00192.jpg",
      "/uploads/images/60bc5ce38a15913d6bdc81e7/1TNT00193.jpg",
      "/uploads/images/60bc5ce38a15913d6bdc81e8/1TNT00195.jpg",
      "/uploads/images/60bc5ce38a15913d6bdc81e9/1TNT00201.jpg",
      "/uploads/images/60bc5ce38a15913d6bdc81ea/1TNT00204.jpg",
      "/uploads/images/60bc5ce38a15913d6bdc81eb/1TNT00207.jpg"
    ],
    "pricing": {
      "hourly": "199.000 VND/2h",
      "extraHour": "60.000 VND/h",
      "overnight": "500.000 VND",
      "fullDay": "800.000 VND"
    },
    "conceptTitle": "Concept Độc Bản: Room - Holywood",
    "conceptDesc": "Private concept Master room 01 Đổi gió riêng tư 02 Setup chỉn chu Concept phòng Đủ lạ để đổi gió, đủ tinh tế để vẫn thoải mái. Master n Slave không đi theo kiểu trang trí quá ồn. Cảm giác chính là nền đỏ đen ấm, chi tiết Indochine, ánh sáng có chiều sâu và một điểm nhấn S-curve để buổi hẹn có thêm trải nghiệm mới. Tổng đỏ đen huyền bí Không gian có độ tương phản mạnh, hợp những cặp đôi muốn một buổi hẹn khác nhịp thường ngày. Nội thất Indochine Chi tiết gỗ, họa tiết và ánh sáng tạo cảm giác boutique, sang hơn một phòng nghỉ thông thường. Ghế S-curve Điểm nhấn trải nghiệm riêng của phòng, được bố trí trong tổng thể kín đáo và có gu. Tiện nghi đủ dùng Điều hòa, WiFi, TV giải trí và các tiện ích cơ bản cho thời gian nghỉ theo giờ hoặc qua đêm. Gọi tư vấn phòng Nhắn Zalo xem ảnh thật",
    "perks": [
      {
        "title": "Bồn tắm sục Jacuzzi đôi",
        "desc": "Không gian thư giãn đẳng cấp với bồn tắm sục lãng mạn, nước nóng ấm áp, bọt xà phòng hoa hồng."
      },
      {
        "title": "Ghế tình yêu Tantra cao cấp",
        "desc": "Đường cong công thái học chuẩn chỉn chu, mang đến cảm xúc thăng hoa bất tận cho cặp đôi."
      },
      {
        "title": "Máy chiếu phim Full HD / 4K",
        "desc": "Màn chiếu siêu rộng xem Netflix, YouTube, chill cùng bộ phim lãng mạn yêu thích."
      },
      {
        "title": "Ánh sáng nghệ thuật Mood Light",
        "desc": "Hệ thống đèn neon, trần ngàn sao và tone màu đa sắc tạo nên không khí quyến rũ độc bản."
      },
      {
        "title": "Miễn phí Cosplay & Đạo cụ",
        "desc": "Mượn trang phục hoá trang quyến rũ, đồ chơi tình yêu và Board Game gắn kết miễn phí."
      },
      {
        "title": "Bảo mật thông tin 100%",
        "desc": "Thủ tục check-in kín đáo, nhận phòng riêng tư, bảo vệ thông tin khách hàng tuyệt đối."
      }
    ],
    "faqs": [
      {
        "question": "Phòng Room - Holywood có sẵn bồn tắm và máy chiếu không?",
        "answer": "Phòng được trang bị đầy đủ tiện nghi cao cấp theo concept riêng, bao gồm bồn tắm thư giãn, ghế tình yêu Tantra, máy chiếu/Smart TV sắc nét và hệ thống đèn lãng mạn."
      },
      {
        "question": "Tôi có cần đặt cọc trước khi đến nhận phòng không?",
        "answer": "Nếu bạn đến trong vòng 15-20 phút, Mix Hotel sẽ giữ phòng miễn phí không cần cọc. Nếu bạn đặt trước nhiều giờ hoặc qua đêm, vui lòng cọc trước để đảm bảo phòng được giữ 100%."
      },
      {
        "question": "Mix Boutique Hotel có hỗ trợ trang trí tiệc kỷ niệm, sinh nhật không?",
        "answer": "Có! Mix Hotel có 4 gói decor chuyên nghiệp gồm nến, hoa hồng, bong bóng, bánh kem và rượu vang ngoại nhập. Hãy báo trước ít nhất 2-4 tiếng để nhân viên setup hoàn hảo nhất."
      },
      {
        "question": "Khách sạn có cho mượn đồ Cosplay và Board Game tình yêu không?",
        "answer": "Mix Hotel hoàn toàn miễn phí mượn trang phục Cosplay quyến rũ, phụ kiện BDSM tinh tế và bộ Board Game thử thách tình yêu cho tất cả khách hàng lưu trú."
      }
    ],
    "storyHtml": "\n<div class=\"container\">\n<div class=\"content-frame\">\n\n<div class=\"content-body size-1vw data_contents\">\n<p><img alt=\"Khách sạn tình yêu - Holywood\" src=\"/uploads/pictures/60bc5ca28a15913d6bdc81d7/content_1TNT00185.jpg\" style=\"height:533px; width:800px\"></p>\n\n<p><img alt=\"Khách sạn tình yêu - Holywood\" src=\"/uploads/pictures/60bc5ca28a15913d6bdc81d8/content_1TNT00190.jpg\" style=\"height:534px; width:800px\"></p>\n\n<p><img alt=\"Khách sạn tình yêu - Holywood\" src=\"/uploads/pictures/60bc5ca28a15913d6bdc81d9/content_1TNT00188.jpg\" style=\"height:676px; width:800px\"></p>\n\n<p><img alt=\"Khách sạn tình yêu - Holywood\" src=\"/uploads/pictures/60bc5ca58a15913d6bdc81da/content_1TNT00191.jpg\" style=\"height:532px; width:800px\"></p>\n\n<p><img alt=\"Khách sạn tình yêu - Holywood\" src=\"/uploads/pictures/60bc5ca58a15913d6bdc81db/content_1TNT00193.jpg\" style=\"height:534px; width:800px\"></p>\n\n<p><img alt=\"Khách sạn tình yêu - Holywood\" src=\"/uploads/pictures/60bc5ca68a15913d6bdc81dc/content_1TNT00192.jpg\" style=\"height:533px; width:800px\"></p>\n\n<p><img alt=\"Khách sạn tình yêu - Holywood\" src=\"/uploads/pictures/60bc5ca88a15913d6bdc81dd/content_1TNT00195.jpg\" style=\"height:533px; width:800px\"></p>\n\n<p><img alt=\"Khách sạn tình yêu - Holywood\" src=\"/uploads/pictures/60bc5ca88a15913d6bdc81de/content_1TNT00201.jpg\" style=\"height:800px; width:532px\"></p>\n\n<p><img alt=\"Khách sạn tình yêu - Holywood\" src=\"/uploads/pictures/60bc5ca98a15913d6bdc81df/content_1TNT00204.jpg\" style=\"height:533px; width:800px\"></p>\n\n<p><img alt=\"Khách sạn tình yêu - Holywood\" src=\"/uploads/pictures/60bc5ca98a15913d6bdc81e0/content_1TNT00207.jpg\" style=\"height:532px; width:800px\"></p>\n</div>\n</div>\n</div>\n"
  },
  "honeymoon": {
    "slug": "honeymoon",
    "name": "Room - Honeymoon",
    "roomType": "Deluxe",
    "badge": "Deluxe Suite",
    "branchId": "branch-mix-boutique-hotel-20-phuc-la-ha-dong",
    "branchName": "Mix Boutique Hotel 20 Phúc La Hà Đông",
    "branchAddress": "20, P. Phúc La, Hà Đông, Hà Nội",
    "branchPhone": "0383 104 010",
    "branchZalo": "https://zalo.me/0383104010",
    "heroImage": "/uploads/images/60bc5f2d8a15913d6bdc81fe/honeymoon.webp",
    "heroSubtitle": "Trong dòng chảy vội vã của thời gian, không ai biết tương lai sẽ ra sao, nhưng em biết chắc chắn rằng những kỷ niệm đẹp đẽ và rung cảm của chúng ta dành cho nhau sẽ chẳng có gì xóa nhòa được. Em muốn ngày ngày cùng nhau đến Honeymoon, để mỗi lúc b...",
    "youtubeUrl": "",
    "galleryImages": [
      "/uploads/images/60bc5f2d8a15913d6bdc81fe/honeymoon.webp",
      "/uploads/images/60bc5f2d8a15913d6bdc81ff/1TNT00216.jpg",
      "/uploads/images/60bc5f2d8a15913d6bdc8200/1TNT00222.jpg",
      "/uploads/images/60bc5f2d8a15913d6bdc8201/1TNT00223.jpg",
      "/uploads/images/60bc5f2d8a15913d6bdc8202/1TNT00224.jpg",
      "/uploads/images/60bc5f2d8a15913d6bdc8203/1TNT00228.jpg",
      "/uploads/images/60bc5f2d8a15913d6bdc8204/1TNT00230.jpg",
      "/uploads/images/60bc5f2d8a15913d6bdc8205/1TNT00231.jpg",
      "/uploads/images/60bc5f2d8a15913d6bdc8206/1TNT00232.jpg",
      "/uploads/images/60bc5f2d8a15913d6bdc8207/1TNT00233.jpg",
      "/uploads/images/60bc5f2d8a15913d6bdc8208/1TNT00234.jpg",
      "/uploads/images/60bc5f2d8a15913d6bdc8209/1TNT00237.jpg"
    ],
    "pricing": {
      "hourly": "300.000 VND/2h",
      "extraHour": "70.000 VND/h",
      "overnight": "600.000 VND",
      "fullDay": "950.000 VND"
    },
    "conceptTitle": "Concept Độc Bản: Room - Honeymoon",
    "conceptDesc": "Private concept Master room 01 Đổi gió riêng tư 02 Setup chỉn chu Concept phòng Đủ lạ để đổi gió, đủ tinh tế để vẫn thoải mái. Master n Slave không đi theo kiểu trang trí quá ồn. Cảm giác chính là nền đỏ đen ấm, chi tiết Indochine, ánh sáng có chiều sâu và một điểm nhấn S-curve để buổi hẹn có thêm trải nghiệm mới. Tổng đỏ đen huyền bí Không gian có độ tương phản mạnh, hợp những cặp đôi muốn một buổi hẹn khác nhịp thường ngày. Nội thất Indochine Chi tiết gỗ, họa tiết và ánh sáng tạo cảm giác boutique, sang hơn một phòng nghỉ thông thường. Ghế S-curve Điểm nhấn trải nghiệm riêng của phòng, được bố trí trong tổng thể kín đáo và có gu. Tiện nghi đủ dùng Điều hòa, WiFi, TV giải trí và các tiện ích cơ bản cho thời gian nghỉ theo giờ hoặc qua đêm. Gọi tư vấn phòng Nhắn Zalo xem ảnh thật",
    "perks": [
      {
        "title": "Bồn tắm sục Jacuzzi đôi",
        "desc": "Không gian thư giãn đẳng cấp với bồn tắm sục lãng mạn, nước nóng ấm áp, bọt xà phòng hoa hồng."
      },
      {
        "title": "Ghế tình yêu Tantra cao cấp",
        "desc": "Đường cong công thái học chuẩn chỉn chu, mang đến cảm xúc thăng hoa bất tận cho cặp đôi."
      },
      {
        "title": "Máy chiếu phim Full HD / 4K",
        "desc": "Màn chiếu siêu rộng xem Netflix, YouTube, chill cùng bộ phim lãng mạn yêu thích."
      },
      {
        "title": "Ánh sáng nghệ thuật Mood Light",
        "desc": "Hệ thống đèn neon, trần ngàn sao và tone màu đa sắc tạo nên không khí quyến rũ độc bản."
      },
      {
        "title": "Miễn phí Cosplay & Đạo cụ",
        "desc": "Mượn trang phục hoá trang quyến rũ, đồ chơi tình yêu và Board Game gắn kết miễn phí."
      },
      {
        "title": "Bảo mật thông tin 100%",
        "desc": "Thủ tục check-in kín đáo, nhận phòng riêng tư, bảo vệ thông tin khách hàng tuyệt đối."
      }
    ],
    "faqs": [
      {
        "question": "Phòng Room - Honeymoon có sẵn bồn tắm và máy chiếu không?",
        "answer": "Phòng được trang bị đầy đủ tiện nghi cao cấp theo concept riêng, bao gồm bồn tắm thư giãn, ghế tình yêu Tantra, máy chiếu/Smart TV sắc nét và hệ thống đèn lãng mạn."
      },
      {
        "question": "Tôi có cần đặt cọc trước khi đến nhận phòng không?",
        "answer": "Nếu bạn đến trong vòng 15-20 phút, Mix Hotel sẽ giữ phòng miễn phí không cần cọc. Nếu bạn đặt trước nhiều giờ hoặc qua đêm, vui lòng cọc trước để đảm bảo phòng được giữ 100%."
      },
      {
        "question": "Mix Boutique Hotel có hỗ trợ trang trí tiệc kỷ niệm, sinh nhật không?",
        "answer": "Có! Mix Hotel có 4 gói decor chuyên nghiệp gồm nến, hoa hồng, bong bóng, bánh kem và rượu vang ngoại nhập. Hãy báo trước ít nhất 2-4 tiếng để nhân viên setup hoàn hảo nhất."
      },
      {
        "question": "Khách sạn có cho mượn đồ Cosplay và Board Game tình yêu không?",
        "answer": "Mix Hotel hoàn toàn miễn phí mượn trang phục Cosplay quyến rũ, phụ kiện BDSM tinh tế và bộ Board Game thử thách tình yêu cho tất cả khách hàng lưu trú."
      }
    ],
    "storyHtml": "\n<div class=\"container\">\n<div class=\"content-frame\">\n\n<div class=\"content-body size-1vw data_contents\">\n<p><img alt=\"Khách sạn tình yêu - Honeymoon\" src=\"/uploads/pictures/60bc5ec58a15913d6bdc81f3/content_1TNT00216.jpg\" style=\"height:532px; width:800px\"></p>\n\n<p><img alt=\"Khách sạn tình yêu - Honeymoon\" src=\"/uploads/pictures/60bc5ec58a15913d6bdc81f1/content_1TNT00223.jpg\" style=\"height:800px; width:532px\"></p>\n\n<p><img alt=\"Khách sạn tình yêu - Honeymoon\" src=\"/uploads/pictures/60bc5ec58a15913d6bdc81f2/content_1TNT00222.jpg\" style=\"height:533px; width:800px\"></p>\n\n<p><img alt=\"Khách sạn tình yêu - Honeymoon\" src=\"/uploads/pictures/60bc5ec68a15913d6bdc81f4/content_1TNT00224.jpg\" style=\"height:800px; width:533px\"></p>\n\n<p><img alt=\"Khách sạn tình yêu - Honeymoon\" src=\"/uploads/pictures/60bc5ec88a15913d6bdc81f5/content_1TNT00228.jpg\" style=\"height:533px; width:800px\"></p>\n\n<p><img alt=\"Khách sạn tình yêu - Honeymoon\" src=\"/uploads/pictures/60bc5ec88a15913d6bdc81f6/content_1TNT00230.jpg\" style=\"height:533px; width:800px\"></p>\n\n<p><img alt=\"Khách sạn tình yêu - Honeymoon\" src=\"/uploads/pictures/60bc5ec98a15913d6bdc81f7/content_1TNT00231.jpg\" style=\"height:533px; width:800px\"></p>\n\n<p><img alt=\"Khách sạn tình yêu - Honeymoon\" src=\"/uploads/pictures/60bc5eca8a15913d6bdc81f8/content_1TNT00232.jpg\" style=\"height:533px; width:800px\"></p>\n\n<p><img alt=\"Khách sạn tình yêu - Honeymoon\" src=\"/uploads/pictures/60bc5ecb8a15913d6bdc81f9/content_1TNT00233.jpg\" style=\"height:533px; width:800px\"></p>\n\n<p><img alt=\"Khách sạn tình yêu - Honeymoon\" src=\"/uploads/pictures/60bc5ecb8a15913d6bdc81fa/content_1TNT00234.jpg\" style=\"height:533px; width:800px\"></p>\n\n<p><img alt=\"Khách sạn tình yêu - Honeymoon\" src=\"/uploads/pictures/60bc5ecc8a15913d6bdc81fb/content_1TNT00237.jpg\" style=\"height:532px; width:800px\"></p>\n\n<p><img alt=\"Khách sạn tình yêu - Honeymoon\" src=\"/uploads/pictures/60bc5ecd8a15913d6bdc81fc/content_1TNT00238.jpg\" style=\"height:535px; width:800px\"></p>\n\n<p><img alt=\"Khách sạn tình yêu - Honeymoon\" src=\"/uploads/pictures/60bc5ece8a15913d6bdc81fd/content_1TNT00239.jpg\" style=\"height:534px; width:800px\"></p>\n</div>\n</div>\n</div>\n"
  },
  "flame": {
    "slug": "flame",
    "name": "Room - Flame",
    "roomType": "Deluxe",
    "badge": "Deluxe Suite",
    "branchId": "branch-mix-boutique-hotel-20-phuc-la-ha-dong",
    "branchName": "Mix Boutique Hotel 20 Phúc La Hà Đông",
    "branchAddress": "20, P. Phúc La, Hà Đông, Hà Nội",
    "branchPhone": "0383 104 010",
    "branchZalo": "https://zalo.me/0383104010",
    "heroImage": "/uploads/images/60bc61c48a15913d6bdc8229/Flame.webp",
    "heroSubtitle": "Một lần thôi, xin em hãy để tâm hồn lạc lối, buông mình vào màn đêm sâu thẳm để cảm nhận hơi ấm chảy giữa đôi làn môi của anh đang mơn man châm lửa, hực hờ hoang hoải dần thiêu đốt da thịt em và chỉ thêm một cái chạm nhẹ của đôi bàn tay anh nóng b...",
    "youtubeUrl": "",
    "galleryImages": [
      "/uploads/images/60bc61c48a15913d6bdc8229/Flame.webp",
      "/uploads/images/60bc61c48a15913d6bdc822a/1TNT00270.jpg",
      "/uploads/images/60bc61c48a15913d6bdc822b/1TNT00273.jpg",
      "/uploads/images/60bc61c48a15913d6bdc822c/1TNT00277.jpg",
      "/uploads/images/60bc61c48a15913d6bdc822d/1TNT00278.jpg",
      "/uploads/images/60bc61c48a15913d6bdc822e/1TNT00283.jpg",
      "/uploads/images/60bc61c48a15913d6bdc822f/1TNT00286.jpg",
      "/uploads/images/60bc61c48a15913d6bdc8230/1TNT00290.jpg"
    ],
    "pricing": {
      "hourly": "300.000 VND/2h",
      "extraHour": "70.000 VND/h",
      "overnight": "600.000 VND",
      "fullDay": "950.000 VND"
    },
    "conceptTitle": "Concept Độc Bản: Room - Flame",
    "conceptDesc": "Private concept Master room 01 Đổi gió riêng tư 02 Setup chỉn chu Concept phòng Đủ lạ để đổi gió, đủ tinh tế để vẫn thoải mái. Master n Slave không đi theo kiểu trang trí quá ồn. Cảm giác chính là nền đỏ đen ấm, chi tiết Indochine, ánh sáng có chiều sâu và một điểm nhấn S-curve để buổi hẹn có thêm trải nghiệm mới. Tổng đỏ đen huyền bí Không gian có độ tương phản mạnh, hợp những cặp đôi muốn một buổi hẹn khác nhịp thường ngày. Nội thất Indochine Chi tiết gỗ, họa tiết và ánh sáng tạo cảm giác boutique, sang hơn một phòng nghỉ thông thường. Ghế S-curve Điểm nhấn trải nghiệm riêng của phòng, được bố trí trong tổng thể kín đáo và có gu. Tiện nghi đủ dùng Điều hòa, WiFi, TV giải trí và các tiện ích cơ bản cho thời gian nghỉ theo giờ hoặc qua đêm. Gọi tư vấn phòng Nhắn Zalo xem ảnh thật",
    "perks": [
      {
        "title": "Bồn tắm sục Jacuzzi đôi",
        "desc": "Không gian thư giãn đẳng cấp với bồn tắm sục lãng mạn, nước nóng ấm áp, bọt xà phòng hoa hồng."
      },
      {
        "title": "Ghế tình yêu Tantra cao cấp",
        "desc": "Đường cong công thái học chuẩn chỉn chu, mang đến cảm xúc thăng hoa bất tận cho cặp đôi."
      },
      {
        "title": "Máy chiếu phim Full HD / 4K",
        "desc": "Màn chiếu siêu rộng xem Netflix, YouTube, chill cùng bộ phim lãng mạn yêu thích."
      },
      {
        "title": "Ánh sáng nghệ thuật Mood Light",
        "desc": "Hệ thống đèn neon, trần ngàn sao và tone màu đa sắc tạo nên không khí quyến rũ độc bản."
      },
      {
        "title": "Miễn phí Cosplay & Đạo cụ",
        "desc": "Mượn trang phục hoá trang quyến rũ, đồ chơi tình yêu và Board Game gắn kết miễn phí."
      },
      {
        "title": "Bảo mật thông tin 100%",
        "desc": "Thủ tục check-in kín đáo, nhận phòng riêng tư, bảo vệ thông tin khách hàng tuyệt đối."
      }
    ],
    "faqs": [
      {
        "question": "Phòng Room - Flame có sẵn bồn tắm và máy chiếu không?",
        "answer": "Phòng được trang bị đầy đủ tiện nghi cao cấp theo concept riêng, bao gồm bồn tắm thư giãn, ghế tình yêu Tantra, máy chiếu/Smart TV sắc nét và hệ thống đèn lãng mạn."
      },
      {
        "question": "Tôi có cần đặt cọc trước khi đến nhận phòng không?",
        "answer": "Nếu bạn đến trong vòng 15-20 phút, Mix Hotel sẽ giữ phòng miễn phí không cần cọc. Nếu bạn đặt trước nhiều giờ hoặc qua đêm, vui lòng cọc trước để đảm bảo phòng được giữ 100%."
      },
      {
        "question": "Mix Boutique Hotel có hỗ trợ trang trí tiệc kỷ niệm, sinh nhật không?",
        "answer": "Có! Mix Hotel có 4 gói decor chuyên nghiệp gồm nến, hoa hồng, bong bóng, bánh kem và rượu vang ngoại nhập. Hãy báo trước ít nhất 2-4 tiếng để nhân viên setup hoàn hảo nhất."
      },
      {
        "question": "Khách sạn có cho mượn đồ Cosplay và Board Game tình yêu không?",
        "answer": "Mix Hotel hoàn toàn miễn phí mượn trang phục Cosplay quyến rũ, phụ kiện BDSM tinh tế và bộ Board Game thử thách tình yêu cho tất cả khách hàng lưu trú."
      }
    ],
    "storyHtml": "\n<div class=\"container\">\n<div class=\"content-frame\">\n\n<div class=\"content-body size-1vw data_contents\">\n<p><img alt=\"Khách sạn tình yêu - Flame\" src=\"/uploads/pictures/60bc61908a15913d6bdc8224/content_1TNT00270.jpg\" style=\"height:533px; width:800px\"></p>\n\n<p><img alt=\"Khách sạn tình yêu - Flame\" src=\"/uploads/pictures/60bc61908a15913d6bdc8222/content_1TNT00277.jpg\" style=\"height:533px; width:800px\"></p>\n\n<p><img alt=\"Khách sạn tình yêu - Flame\" src=\"/uploads/pictures/60bc61908a15913d6bdc8223/content_1TNT00273.jpg\"></p>\n\n<p><img alt=\"Khách sạn tình yêu - Flame\" src=\"/uploads/pictures/60bc61928a15913d6bdc8225/content_1TNT00278.jpg\"></p>\n\n<p><img alt=\"Khách sạn tình yêu - Flame\" src=\"/uploads/pictures/60bc61928a15913d6bdc8226/content_1TNT00283.jpg\" style=\"height:535px; width:800px\"></p>\n\n<p><img alt=\"Khách sạn tình yêu - Flame\" src=\"/uploads/pictures/60bc61938a15913d6bdc8227/content_1TNT00286.jpg\"></p>\n\n<p><img alt=\"Khách sạn tình yêu - Flame\" src=\"/uploads/pictures/60bc61938a15913d6bdc8228/content_1TNT00290.jpg\" style=\"height:533px; width:800px\"></p>\n</div>\n</div>\n</div>\n"
  },
  "passion": {
    "slug": "passion",
    "name": "Room - Passion",
    "roomType": "Deluxe",
    "badge": "Deluxe Suite",
    "branchId": "branch-mix-boutique-hotel-20-phuc-la-ha-dong",
    "branchName": "Mix Boutique Hotel 20 Phúc La Hà Đông",
    "branchAddress": "20, P. Phúc La, Hà Đông, Hà Nội",
    "branchPhone": "0383 104 010",
    "branchZalo": "https://zalo.me/0383104010",
    "heroImage": "/uploads/images/60bc62f18a15913d6bdc823d/Passion.webp",
    "heroSubtitle": "Passion - Một câu chuyện tình không thể được coi là đẹp nếu thiếu đi sự đam mê cuồng nhiệt của những phút yêu đầu. Đam mê khiến ta thèm được uống từng ánh mắt, đôi môi, giọng nói và thậm chí là thèm được lấp đầy nỗi nhớ bằng mùi hương da thịt của ...",
    "youtubeUrl": "",
    "galleryImages": [
      "/uploads/images/60bc62f18a15913d6bdc823d/Passion.webp",
      "/uploads/images/60bc62f18a15913d6bdc823e/1TNT00240.jpg",
      "/uploads/images/60bc62f18a15913d6bdc823f/1TNT00242.jpg",
      "/uploads/images/60bc62f18a15913d6bdc8240/1TNT00246.jpg",
      "/uploads/images/60bc62f18a15913d6bdc8241/1TNT00247.jpg",
      "/uploads/images/60bc62f18a15913d6bdc8242/1TNT00249.jpg",
      "/uploads/images/60bc62f18a15913d6bdc8243/1TNT00252.jpg",
      "/uploads/images/60bc62f18a15913d6bdc8244/1TNT00264.jpg"
    ],
    "pricing": {
      "hourly": "300.000 VND/2h",
      "extraHour": "70.000 VND/h",
      "overnight": "600.000 VND",
      "fullDay": "950.000 VND"
    },
    "conceptTitle": "Concept Độc Bản: Room - Passion",
    "conceptDesc": "Private concept Master room 01 Đổi gió riêng tư 02 Setup chỉn chu Concept phòng Đủ lạ để đổi gió, đủ tinh tế để vẫn thoải mái. Master n Slave không đi theo kiểu trang trí quá ồn. Cảm giác chính là nền đỏ đen ấm, chi tiết Indochine, ánh sáng có chiều sâu và một điểm nhấn S-curve để buổi hẹn có thêm trải nghiệm mới. Tổng đỏ đen huyền bí Không gian có độ tương phản mạnh, hợp những cặp đôi muốn một buổi hẹn khác nhịp thường ngày. Nội thất Indochine Chi tiết gỗ, họa tiết và ánh sáng tạo cảm giác boutique, sang hơn một phòng nghỉ thông thường. Ghế S-curve Điểm nhấn trải nghiệm riêng của phòng, được bố trí trong tổng thể kín đáo và có gu. Tiện nghi đủ dùng Điều hòa, WiFi, TV giải trí và các tiện ích cơ bản cho thời gian nghỉ theo giờ hoặc qua đêm. Gọi tư vấn phòng Nhắn Zalo xem ảnh thật",
    "perks": [
      {
        "title": "Bồn tắm sục Jacuzzi đôi",
        "desc": "Không gian thư giãn đẳng cấp với bồn tắm sục lãng mạn, nước nóng ấm áp, bọt xà phòng hoa hồng."
      },
      {
        "title": "Ghế tình yêu Tantra cao cấp",
        "desc": "Đường cong công thái học chuẩn chỉn chu, mang đến cảm xúc thăng hoa bất tận cho cặp đôi."
      },
      {
        "title": "Máy chiếu phim Full HD / 4K",
        "desc": "Màn chiếu siêu rộng xem Netflix, YouTube, chill cùng bộ phim lãng mạn yêu thích."
      },
      {
        "title": "Ánh sáng nghệ thuật Mood Light",
        "desc": "Hệ thống đèn neon, trần ngàn sao và tone màu đa sắc tạo nên không khí quyến rũ độc bản."
      },
      {
        "title": "Miễn phí Cosplay & Đạo cụ",
        "desc": "Mượn trang phục hoá trang quyến rũ, đồ chơi tình yêu và Board Game gắn kết miễn phí."
      },
      {
        "title": "Bảo mật thông tin 100%",
        "desc": "Thủ tục check-in kín đáo, nhận phòng riêng tư, bảo vệ thông tin khách hàng tuyệt đối."
      }
    ],
    "faqs": [
      {
        "question": "Phòng Room - Passion có sẵn bồn tắm và máy chiếu không?",
        "answer": "Phòng được trang bị đầy đủ tiện nghi cao cấp theo concept riêng, bao gồm bồn tắm thư giãn, ghế tình yêu Tantra, máy chiếu/Smart TV sắc nét và hệ thống đèn lãng mạn."
      },
      {
        "question": "Tôi có cần đặt cọc trước khi đến nhận phòng không?",
        "answer": "Nếu bạn đến trong vòng 15-20 phút, Mix Hotel sẽ giữ phòng miễn phí không cần cọc. Nếu bạn đặt trước nhiều giờ hoặc qua đêm, vui lòng cọc trước để đảm bảo phòng được giữ 100%."
      },
      {
        "question": "Mix Boutique Hotel có hỗ trợ trang trí tiệc kỷ niệm, sinh nhật không?",
        "answer": "Có! Mix Hotel có 4 gói decor chuyên nghiệp gồm nến, hoa hồng, bong bóng, bánh kem và rượu vang ngoại nhập. Hãy báo trước ít nhất 2-4 tiếng để nhân viên setup hoàn hảo nhất."
      },
      {
        "question": "Khách sạn có cho mượn đồ Cosplay và Board Game tình yêu không?",
        "answer": "Mix Hotel hoàn toàn miễn phí mượn trang phục Cosplay quyến rũ, phụ kiện BDSM tinh tế và bộ Board Game thử thách tình yêu cho tất cả khách hàng lưu trú."
      }
    ],
    "storyHtml": "\n<div class=\"container\">\n<div class=\"content-frame\">\n\n<div class=\"content-body size-1vw data_contents\">\n<p><img alt=\"Khách sạn tình yêu - Passion\" src=\"/uploads/pictures/60bc62c88a15913d6bdc8236/content_1TNT00240.jpg\"></p>\n\n<p><img alt=\"Khách sạn tình yêu - Passion\" src=\"/uploads/pictures/60bc62c88a15913d6bdc8237/content_1TNT00242.jpg\" style=\"height:534px; width:800px\"></p>\n\n<p><img alt=\"Khách sạn tình yêu - Passion\" src=\"/uploads/pictures/60bc62c98a15913d6bdc8238/content_1TNT00246.jpg\" style=\"height:616px; width:800px\"></p>\n\n<p><img alt=\"Khách sạn tình yêu - Passion\" src=\"/uploads/pictures/60bc62ca8a15913d6bdc8239/content_1TNT00249.jpg\"></p>\n\n<p><img alt=\"Khách sạn tình yêu - Passion\" src=\"/uploads/pictures/60bc62ca8a15913d6bdc823a/content_1TNT00247.jpg\" style=\"height:533px; width:800px\"></p>\n\n<p><img alt=\"Khách sạn tình yêu - Passion\" src=\"/uploads/pictures/60bc62ca8a15913d6bdc823b/content_1TNT00252.jpg\" style=\"height:532px; width:800px\"></p>\n\n<p><img alt=\"Khách sạn tình yêu - Passion\" src=\"/uploads/pictures/60bc62cb8a15913d6bdc823c/content_1TNT00264.jpg\"></p>\n</div>\n</div>\n</div>\n"
  },
  "whisper": {
    "slug": "whisper",
    "name": "Room - Whisper",
    "roomType": "Deluxe",
    "badge": "Deluxe Suite",
    "branchId": "branch-mix-boutique-hotel-20-phuc-la-ha-dong",
    "branchName": "Mix Boutique Hotel 20 Phúc La Hà Đông",
    "branchAddress": "20, P. Phúc La, Hà Đông, Hà Nội",
    "branchPhone": "0383 104 010",
    "branchZalo": "https://zalo.me/0383104010",
    "heroImage": "/uploads/images/606eba398a15917d2a0cdb3c/whisper.webp",
    "heroSubtitle": "Một lời thì thầm gợi cảm mang theo hơi thở ấm áp nồng nàn kề cận chính là thông điệp yêu thương mạnh mẽ nhất giúp ta chạm tới tất cả những mảnh ghép cảm xúc ở nơi sâu thẳm nhất của người tình. “Whisper” mong muốn sẽ cùng bạn dệt nên những lời tự t...",
    "youtubeUrl": "",
    "galleryImages": [
      "/uploads/images/606eba398a15917d2a0cdb3c/whisper.webp",
      "/uploads/images/606eba398a15917d2a0cdb3d/1TN.jpg",
      "/uploads/images/606eba398a15917d2a0cdb3e/1TNN.jpg",
      "/uploads/images/60bc4f678a15913d6bdc814e/1TNT00056.jpg",
      "/uploads/images/60bc4f678a15913d6bdc814f/1TNT00064.jpg",
      "/uploads/images/60bc4f678a15913d6bdc8150/1TNT00066.jpg",
      "/uploads/images/60bc4f678a15913d6bdc8151/1TNT00069.jpg",
      "/uploads/images/60bc4f678a15913d6bdc8152/1TNT00070.jpg",
      "/uploads/images/60bc4f678a15913d6bdc8153/1TNT00072.jpg",
      "/uploads/images/60bc4f678a15913d6bdc8154/1TNT00073.jpg",
      "/uploads/images/60bc4f678a15913d6bdc8155/1TNT00074.jpg",
      "/uploads/images/60bc4f678a15913d6bdc8156/1TNT00076.jpg"
    ],
    "pricing": {
      "hourly": "300.000 VND/2h",
      "extraHour": "70.000 VND/h",
      "overnight": "600.000 VND",
      "fullDay": "950.000 VND"
    },
    "conceptTitle": "Concept Độc Bản: Room - Whisper",
    "conceptDesc": "Private concept Master room 01 Đổi gió riêng tư 02 Setup chỉn chu Concept phòng Đủ lạ để đổi gió, đủ tinh tế để vẫn thoải mái. Master n Slave không đi theo kiểu trang trí quá ồn. Cảm giác chính là nền đỏ đen ấm, chi tiết Indochine, ánh sáng có chiều sâu và một điểm nhấn S-curve để buổi hẹn có thêm trải nghiệm mới. Tổng đỏ đen huyền bí Không gian có độ tương phản mạnh, hợp những cặp đôi muốn một buổi hẹn khác nhịp thường ngày. Nội thất Indochine Chi tiết gỗ, họa tiết và ánh sáng tạo cảm giác boutique, sang hơn một phòng nghỉ thông thường. Ghế S-curve Điểm nhấn trải nghiệm riêng của phòng, được bố trí trong tổng thể kín đáo và có gu. Tiện nghi đủ dùng Điều hòa, WiFi, TV giải trí và các tiện ích cơ bản cho thời gian nghỉ theo giờ hoặc qua đêm. Gọi tư vấn phòng Nhắn Zalo xem ảnh thật",
    "perks": [
      {
        "title": "Bồn tắm sục Jacuzzi đôi",
        "desc": "Không gian thư giãn đẳng cấp với bồn tắm sục lãng mạn, nước nóng ấm áp, bọt xà phòng hoa hồng."
      },
      {
        "title": "Ghế tình yêu Tantra cao cấp",
        "desc": "Đường cong công thái học chuẩn chỉn chu, mang đến cảm xúc thăng hoa bất tận cho cặp đôi."
      },
      {
        "title": "Máy chiếu phim Full HD / 4K",
        "desc": "Màn chiếu siêu rộng xem Netflix, YouTube, chill cùng bộ phim lãng mạn yêu thích."
      },
      {
        "title": "Ánh sáng nghệ thuật Mood Light",
        "desc": "Hệ thống đèn neon, trần ngàn sao và tone màu đa sắc tạo nên không khí quyến rũ độc bản."
      },
      {
        "title": "Miễn phí Cosplay & Đạo cụ",
        "desc": "Mượn trang phục hoá trang quyến rũ, đồ chơi tình yêu và Board Game gắn kết miễn phí."
      },
      {
        "title": "Bảo mật thông tin 100%",
        "desc": "Thủ tục check-in kín đáo, nhận phòng riêng tư, bảo vệ thông tin khách hàng tuyệt đối."
      }
    ],
    "faqs": [
      {
        "question": "Phòng Room - Whisper có sẵn bồn tắm và máy chiếu không?",
        "answer": "Phòng được trang bị đầy đủ tiện nghi cao cấp theo concept riêng, bao gồm bồn tắm thư giãn, ghế tình yêu Tantra, máy chiếu/Smart TV sắc nét và hệ thống đèn lãng mạn."
      },
      {
        "question": "Tôi có cần đặt cọc trước khi đến nhận phòng không?",
        "answer": "Nếu bạn đến trong vòng 15-20 phút, Mix Hotel sẽ giữ phòng miễn phí không cần cọc. Nếu bạn đặt trước nhiều giờ hoặc qua đêm, vui lòng cọc trước để đảm bảo phòng được giữ 100%."
      },
      {
        "question": "Mix Boutique Hotel có hỗ trợ trang trí tiệc kỷ niệm, sinh nhật không?",
        "answer": "Có! Mix Hotel có 4 gói decor chuyên nghiệp gồm nến, hoa hồng, bong bóng, bánh kem và rượu vang ngoại nhập. Hãy báo trước ít nhất 2-4 tiếng để nhân viên setup hoàn hảo nhất."
      },
      {
        "question": "Khách sạn có cho mượn đồ Cosplay và Board Game tình yêu không?",
        "answer": "Mix Hotel hoàn toàn miễn phí mượn trang phục Cosplay quyến rũ, phụ kiện BDSM tinh tế và bộ Board Game thử thách tình yêu cho tất cả khách hàng lưu trú."
      }
    ],
    "storyHtml": "\n<div class=\"container\">\n<div class=\"content-frame\">\n\n<div class=\"content-body size-1vw data_contents\">\n<p><img alt=\"\" src=\"/uploads/pictures/60bc4d588a15913d6bdc813d/content_1TN.jpg\" style=\"height:800px; width:599px\"></p>\n\n<p><img alt=\"\" src=\"/uploads/pictures/60bc4d588a15913d6bdc813e/content_1TNT00056.jpg\" style=\"height:535px; width:800px\"></p>\n\n<p><img alt=\"\" src=\"/uploads/pictures/60bc4d598a15913d6bdc813f/content_1TNN.jpg\" style=\"height:800px; width:642px\"></p>\n\n<p><img alt=\"\" src=\"/uploads/pictures/60bc4d5a8a15913d6bdc8140/content_1TNT00064.jpg\" style=\"height:533px; width:800px\"></p>\n\n<p><img alt=\"\" src=\"/uploads/pictures/60bc4d5a8a15913d6bdc8141/content_1TNT00066.jpg\" style=\"height:535px; width:800px\"></p>\n\n<p><img alt=\"\" src=\"/uploads/pictures/60bc4d5a8a15913d6bdc8142/content_1TNT00069.jpg\" style=\"height:532px; width:800px\"></p>\n\n<p><img alt=\"\" src=\"/uploads/pictures/60bc4d5b8a15913d6bdc8143/content_1TNT00070.jpg\" style=\"height:532px; width:800px\"></p>\n\n<p><img alt=\"\" src=\"/uploads/pictures/60bc4d5c8a15913d6bdc8144/content_1TNT00072.jpg\" style=\"height:532px; width:800px\"></p>\n\n<p><img alt=\"\" src=\"/uploads/pictures/60bc4d5c8a15913d6bdc8145/content_1TNT00073.jpg\" style=\"height:532px; width:800px\"></p>\n\n<p><img alt=\"\" src=\"/uploads/pictures/60bc4d5d8a15913d6bdc8146/content_1TNT00074.jpg\" style=\"height:533px; width:800px\"></p>\n\n<p><img alt=\"\" src=\"/uploads/pictures/60bc4d5d8a15913d6bdc8147/content_1TNT00076.jpg\" style=\"height:533px; width:800px\"></p>\n\n<p><img alt=\"\" src=\"/uploads/pictures/60bc4d5e8a15913d6bdc8148/content_1TNT00077.jpg\" style=\"height:533px; width:800px\"></p>\n\n<p><img alt=\"\" src=\"/uploads/pictures/60bc4d5e8a15913d6bdc8149/content_1TNT00078.jpg\" style=\"height:800px; width:532px\"></p>\n\n<p><img alt=\"\" src=\"/uploads/pictures/60bc4d5f8a15913d6bdc814a/content_1TNT00080.jpg\" style=\"height:800px; width:562px\"><img alt=\"\" src=\"/uploads/pictures/60bc4d5f8a15913d6bdc814b/content_1TNT00082.jpg\" style=\"height:533px; width:800px\"></p>\n\n<p><img alt=\"\" src=\"/uploads/pictures/60bc4d608a15913d6bdc814c/content_1TNT00085.jpg\" style=\"height:535px; width:800px\"></p>\n\n<p><img alt=\"\" src=\"/uploads/pictures/60bc4d608a15913d6bdc814d/content_1TNT00087.jpg\" style=\"height:533px; width:800px\"></p>\n</div>\n</div>\n</div>\n"
  },
  "wake-up": {
    "slug": "wake-up",
    "name": "Room - Wake up",
    "roomType": "Deluxe",
    "badge": "Deluxe Suite",
    "branchId": "branch-mix-boutique-hotel-20-phuc-la-ha-dong",
    "branchName": "Mix Boutique Hotel 20 Phúc La Hà Đông",
    "branchAddress": "20, P. Phúc La, Hà Đông, Hà Nội",
    "branchPhone": "0383 104 010",
    "branchZalo": "https://zalo.me/0383104010",
    "heroImage": "/uploads/images/60bc49c18a15913d6bdc812b/wake-up.webp",
    "heroSubtitle": "Hãy sẵn sàng để được Wake up đánh thức, vỗ về và mơn trớn mọi giác quan, hãy dìu dắt người tình đi qua những miền cảm xúc chưa từng được khám phá trong một không gian bí ẩn...",
    "youtubeUrl": "",
    "galleryImages": [
      "/uploads/images/60bc49c18a15913d6bdc812b/wake-up.webp",
      "/uploads/images/60bc49c18a15913d6bdc812c/1TNT00089.jpg",
      "/uploads/images/60bc49c18a15913d6bdc812d/1TNT00090.jpg",
      "/uploads/images/60bc49c18a15913d6bdc812e/1TNT00091.jpg",
      "/uploads/images/60bc49c18a15913d6bdc812f/1TNT00093.jpg",
      "/uploads/images/60bc49c18a15913d6bdc8130/1TNT00096.jpg",
      "/uploads/images/60bc49c18a15913d6bdc8131/1TNT00097.jpg",
      "/uploads/images/60bc49c18a15913d6bdc8132/1TNT00098.jpg",
      "/uploads/images/60bc49c18a15913d6bdc8133/1TNT00099.jpg",
      "/uploads/images/60bc49c18a15913d6bdc8134/1TNT00100.jpg",
      "/uploads/images/60bc49c18a15913d6bdc8135/1TNT00102.jpg",
      "/uploads/images/60bc49c18a15913d6bdc8136/1TNT00106.jpg"
    ],
    "pricing": {
      "hourly": "300.000 VND/2h",
      "extraHour": "70.000 VND/h",
      "overnight": "600.000 VND",
      "fullDay": "950.000 VND"
    },
    "conceptTitle": "Concept Độc Bản: Room - Wake up",
    "conceptDesc": "Private concept Master room 01 Đổi gió riêng tư 02 Setup chỉn chu Concept phòng Đủ lạ để đổi gió, đủ tinh tế để vẫn thoải mái. Master n Slave không đi theo kiểu trang trí quá ồn. Cảm giác chính là nền đỏ đen ấm, chi tiết Indochine, ánh sáng có chiều sâu và một điểm nhấn S-curve để buổi hẹn có thêm trải nghiệm mới. Tổng đỏ đen huyền bí Không gian có độ tương phản mạnh, hợp những cặp đôi muốn một buổi hẹn khác nhịp thường ngày. Nội thất Indochine Chi tiết gỗ, họa tiết và ánh sáng tạo cảm giác boutique, sang hơn một phòng nghỉ thông thường. Ghế S-curve Điểm nhấn trải nghiệm riêng của phòng, được bố trí trong tổng thể kín đáo và có gu. Tiện nghi đủ dùng Điều hòa, WiFi, TV giải trí và các tiện ích cơ bản cho thời gian nghỉ theo giờ hoặc qua đêm. Gọi tư vấn phòng Nhắn Zalo xem ảnh thật",
    "perks": [
      {
        "title": "Bồn tắm sục Jacuzzi đôi",
        "desc": "Không gian thư giãn đẳng cấp với bồn tắm sục lãng mạn, nước nóng ấm áp, bọt xà phòng hoa hồng."
      },
      {
        "title": "Ghế tình yêu Tantra cao cấp",
        "desc": "Đường cong công thái học chuẩn chỉn chu, mang đến cảm xúc thăng hoa bất tận cho cặp đôi."
      },
      {
        "title": "Máy chiếu phim Full HD / 4K",
        "desc": "Màn chiếu siêu rộng xem Netflix, YouTube, chill cùng bộ phim lãng mạn yêu thích."
      },
      {
        "title": "Ánh sáng nghệ thuật Mood Light",
        "desc": "Hệ thống đèn neon, trần ngàn sao và tone màu đa sắc tạo nên không khí quyến rũ độc bản."
      },
      {
        "title": "Miễn phí Cosplay & Đạo cụ",
        "desc": "Mượn trang phục hoá trang quyến rũ, đồ chơi tình yêu và Board Game gắn kết miễn phí."
      },
      {
        "title": "Bảo mật thông tin 100%",
        "desc": "Thủ tục check-in kín đáo, nhận phòng riêng tư, bảo vệ thông tin khách hàng tuyệt đối."
      }
    ],
    "faqs": [
      {
        "question": "Phòng Room - Wake up có sẵn bồn tắm và máy chiếu không?",
        "answer": "Phòng được trang bị đầy đủ tiện nghi cao cấp theo concept riêng, bao gồm bồn tắm thư giãn, ghế tình yêu Tantra, máy chiếu/Smart TV sắc nét và hệ thống đèn lãng mạn."
      },
      {
        "question": "Tôi có cần đặt cọc trước khi đến nhận phòng không?",
        "answer": "Nếu bạn đến trong vòng 15-20 phút, Mix Hotel sẽ giữ phòng miễn phí không cần cọc. Nếu bạn đặt trước nhiều giờ hoặc qua đêm, vui lòng cọc trước để đảm bảo phòng được giữ 100%."
      },
      {
        "question": "Mix Boutique Hotel có hỗ trợ trang trí tiệc kỷ niệm, sinh nhật không?",
        "answer": "Có! Mix Hotel có 4 gói decor chuyên nghiệp gồm nến, hoa hồng, bong bóng, bánh kem và rượu vang ngoại nhập. Hãy báo trước ít nhất 2-4 tiếng để nhân viên setup hoàn hảo nhất."
      },
      {
        "question": "Khách sạn có cho mượn đồ Cosplay và Board Game tình yêu không?",
        "answer": "Mix Hotel hoàn toàn miễn phí mượn trang phục Cosplay quyến rũ, phụ kiện BDSM tinh tế và bộ Board Game thử thách tình yêu cho tất cả khách hàng lưu trú."
      }
    ],
    "storyHtml": "\n<div class=\"container\">\n<div class=\"content-frame\">\n\n<div class=\"content-body size-1vw data_contents\">\n<p><img alt=\"\" src=\"/uploads/pictures/60bc494d8a15913d6bdc811c/content_1TNT00089.jpg\" style=\"height:800px; width:727px\"></p>\n\n<p><img alt=\"\" src=\"/uploads/pictures/60bc494d8a15913d6bdc811d/content_1TNT00091.jpg\" style=\"height:533px; width:800px\"></p>\n\n<p><img alt=\"\" src=\"/uploads/pictures/60bc494d8a15913d6bdc811e/content_1TNT00090.jpg\" style=\"height:533px; width:800px\"></p>\n\n<p><img alt=\"\" src=\"/uploads/pictures/60bc494f8a15913d6bdc811f/content_1TNT00096.jpg\" style=\"height:535px; width:800px\"></p>\n\n<p><img alt=\"\" src=\"/uploads/pictures/60bc494f8a15913d6bdc8120/content_1TNT00097.jpg\" style=\"height:800px; width:533px\"></p>\n\n<p><img alt=\"\" src=\"/uploads/pictures/60bc494f8a15913d6bdc8121/content_1TNT00093.jpg\" style=\"height:533px; width:800px\"></p>\n\n<p><img alt=\"\" src=\"/uploads/pictures/60bc49508a15913d6bdc8122/content_1TNT00098.jpg\" style=\"height:800px; width:532px\"></p>\n\n<p><img alt=\"\" src=\"/uploads/pictures/60bc49518a15913d6bdc8123/content_1TNT00099.jpg\" style=\"height:533px; width:800px\"></p>\n\n<p><img alt=\"\" src=\"/uploads/pictures/60bc49518a15913d6bdc8124/content_1TNT00100.jpg\" style=\"height:534px; width:800px\"></p>\n\n<p><img alt=\"\" src=\"/uploads/pictures/60bc49528a15913d6bdc8125/content_1TNT00102.jpg\" style=\"height:535px; width:800px\"></p>\n\n<p><img alt=\"\" src=\"/uploads/pictures/60bc49538a15913d6bdc8126/content_1TNT00104.jpg\" style=\"height:549px; width:800px\"></p>\n\n<p><img alt=\"\" src=\"/uploads/pictures/60bc49538a15913d6bdc8127/content_1TNT00106.jpg\" style=\"height:565px; width:800px\"></p>\n\n<p><img alt=\"\" src=\"/uploads/pictures/60bc49538a15913d6bdc8128/content_1TNT00112.jpg\" style=\"height:533px; width:800px\"></p>\n\n<p><img alt=\"\" src=\"/uploads/pictures/60bc49558a15913d6bdc8129/content_1TNT00117.jpg\" style=\"height:533px; width:800px\"></p>\n\n<p><img alt=\"\" src=\"/uploads/pictures/60bc49558a15913d6bdc812a/content_1TNT00119.jpg\" style=\"height:533px; width:800px\"></p>\n</div>\n</div>\n</div>\n"
  },
  "rhett-butler": {
    "slug": "rhett-butler",
    "name": "VIP Room - Rhett Butler",
    "roomType": "VIP",
    "badge": "VIP Suite",
    "branchId": "branch-mix-boutique-hotel-20-phuc-la-ha-dong",
    "branchName": "Mix Boutique Hotel 20 Phúc La Hà Đông",
    "branchAddress": "20, P. Phúc La, Hà Đông, Hà Nội",
    "branchPhone": "0383 104 010",
    "branchZalo": "https://zalo.me/0383104010",
    "heroImage": "/uploads/images/60bc57e78a15913d6bdc8195/rhett-butler.webp",
    "heroSubtitle": "Rhett Butler - 1 thực thể lãng mạn, giao thoa hòa trộn giữa bóng tối và ánh sáng, hoài niệm và mới mẻ, dịu dàng da diết và mãnh liệt đắm say",
    "youtubeUrl": "",
    "galleryImages": [
      "/uploads/images/60bc57e78a15913d6bdc8195/rhett-butler.webp",
      "/uploads/images/60bc57e78a15913d6bdc8196/1TNT00122.jpg",
      "/uploads/images/60bc57e78a15913d6bdc8197/1TNT00123.jpg",
      "/uploads/images/60bc57e78a15913d6bdc8198/1TNT00124.jpg",
      "/uploads/images/60bc57e78a15913d6bdc8199/1TNT00125.jpg",
      "/uploads/images/60bc57e78a15913d6bdc819a/1TNT00126.jpg",
      "/uploads/images/60bc57e78a15913d6bdc819b/1TNT00127.jpg",
      "/uploads/images/60bc57e78a15913d6bdc819c/1TNT00128.jpg",
      "/uploads/images/60bc57e78a15913d6bdc819d/1TNT00129.jpg",
      "/uploads/images/60bc57e78a15913d6bdc819e/1TNT00130.jpg",
      "/uploads/images/60bc57e78a15913d6bdc819f/1TNT00131.jpg",
      "/uploads/images/60bc57e78a15913d6bdc81a0/1TNT00132.jpg"
    ],
    "pricing": {
      "hourly": "400.000 VND/2h",
      "extraHour": "80.000 VND/h",
      "overnight": "750.000 VND",
      "fullDay": "1.200.000 VND"
    },
    "conceptTitle": "Concept Độc Bản: VIP Room - Rhett Butler",
    "conceptDesc": "Private concept Master room 01 Đổi gió riêng tư 02 Setup chỉn chu Concept phòng Đủ lạ để đổi gió, đủ tinh tế để vẫn thoải mái. Master n Slave không đi theo kiểu trang trí quá ồn. Cảm giác chính là nền đỏ đen ấm, chi tiết Indochine, ánh sáng có chiều sâu và một điểm nhấn S-curve để buổi hẹn có thêm trải nghiệm mới. Tổng đỏ đen huyền bí Không gian có độ tương phản mạnh, hợp những cặp đôi muốn một buổi hẹn khác nhịp thường ngày. Nội thất Indochine Chi tiết gỗ, họa tiết và ánh sáng tạo cảm giác boutique, sang hơn một phòng nghỉ thông thường. Ghế S-curve Điểm nhấn trải nghiệm riêng của phòng, được bố trí trong tổng thể kín đáo và có gu. Tiện nghi đủ dùng Điều hòa, WiFi, TV giải trí và các tiện ích cơ bản cho thời gian nghỉ theo giờ hoặc qua đêm. Gọi tư vấn phòng Nhắn Zalo xem ảnh thật",
    "perks": [
      {
        "title": "Bồn tắm sục Jacuzzi đôi",
        "desc": "Không gian thư giãn đẳng cấp với bồn tắm sục lãng mạn, nước nóng ấm áp, bọt xà phòng hoa hồng."
      },
      {
        "title": "Ghế tình yêu Tantra cao cấp",
        "desc": "Đường cong công thái học chuẩn chỉn chu, mang đến cảm xúc thăng hoa bất tận cho cặp đôi."
      },
      {
        "title": "Máy chiếu phim Full HD / 4K",
        "desc": "Màn chiếu siêu rộng xem Netflix, YouTube, chill cùng bộ phim lãng mạn yêu thích."
      },
      {
        "title": "Ánh sáng nghệ thuật Mood Light",
        "desc": "Hệ thống đèn neon, trần ngàn sao và tone màu đa sắc tạo nên không khí quyến rũ độc bản."
      },
      {
        "title": "Miễn phí Cosplay & Đạo cụ",
        "desc": "Mượn trang phục hoá trang quyến rũ, đồ chơi tình yêu và Board Game gắn kết miễn phí."
      },
      {
        "title": "Bảo mật thông tin 100%",
        "desc": "Thủ tục check-in kín đáo, nhận phòng riêng tư, bảo vệ thông tin khách hàng tuyệt đối."
      }
    ],
    "faqs": [
      {
        "question": "Phòng VIP Room - Rhett Butler có sẵn bồn tắm và máy chiếu không?",
        "answer": "Phòng được trang bị đầy đủ tiện nghi cao cấp theo concept riêng, bao gồm bồn tắm thư giãn, ghế tình yêu Tantra, máy chiếu/Smart TV sắc nét và hệ thống đèn lãng mạn."
      },
      {
        "question": "Tôi có cần đặt cọc trước khi đến nhận phòng không?",
        "answer": "Nếu bạn đến trong vòng 15-20 phút, Mix Hotel sẽ giữ phòng miễn phí không cần cọc. Nếu bạn đặt trước nhiều giờ hoặc qua đêm, vui lòng cọc trước để đảm bảo phòng được giữ 100%."
      },
      {
        "question": "Mix Boutique Hotel có hỗ trợ trang trí tiệc kỷ niệm, sinh nhật không?",
        "answer": "Có! Mix Hotel có 4 gói decor chuyên nghiệp gồm nến, hoa hồng, bong bóng, bánh kem và rượu vang ngoại nhập. Hãy báo trước ít nhất 2-4 tiếng để nhân viên setup hoàn hảo nhất."
      },
      {
        "question": "Khách sạn có cho mượn đồ Cosplay và Board Game tình yêu không?",
        "answer": "Mix Hotel hoàn toàn miễn phí mượn trang phục Cosplay quyến rũ, phụ kiện BDSM tinh tế và bộ Board Game thử thách tình yêu cho tất cả khách hàng lưu trú."
      }
    ],
    "storyHtml": "\n<div class=\"container\">\n<div class=\"content-frame\">\n\n<div class=\"content-body size-1vw data_contents\">\n<p><img alt=\"Khách sạn tình yêu - Rhett Butler\" src=\"/uploads/pictures/60bc575c8a15913d6bdc8183/content_1TNT00122.jpg\" style=\"height:533px; width:800px\"></p>\n\n<p><img alt=\"Khách sạn tình yêu - Rhett Butler\" src=\"/uploads/pictures/60bc575b8a15913d6bdc8181/content_1TNT00124.jpg\" style=\"height:800px; width:717px\"></p>\n\n<p><img alt=\"Khách sạn tình yêu - Rhett Butler\" src=\"/uploads/pictures/60bc575c8a15913d6bdc8183/content_1TNT00122.jpg\" style=\"height:533px; width:800px\"></p>\n\n<p><img alt=\"Khách sạn tình yêu - Rhett Butler\" src=\"/uploads/pictures/60bc575c8a15913d6bdc8184/content_1TNT00125.jpg\" style=\"height:800px; width:533px\"></p>\n\n<p><img alt=\"Khách sạn tình yêu - Rhett Butler\" src=\"/uploads/pictures/60bc575d8a15913d6bdc8185/content_1TNT00126.jpg\" style=\"height:535px; width:800px\"></p>\n\n<p><img alt=\"Khách sạn tình yêu - Rhett Butler\" src=\"/uploads/pictures/60bc575d8a15913d6bdc8186/content_1TNT00127.jpg\" style=\"height:800px; width:534px\"></p>\n\n<p><img alt=\"Khách sạn tình yêu - Rhett Butler\" src=\"/uploads/pictures/60bc575d8a15913d6bdc8187/content_1TNT00128.jpg\" style=\"height:800px; width:535px\"></p>\n\n<p><img alt=\"Khách sạn tình yêu - Rhett Butler\" src=\"/uploads/pictures/60bc575e8a15913d6bdc8188/content_1TNT00129.jpg\" style=\"height:619px; width:800px\"></p>\n\n<p><img alt=\"Khách sạn tình yêu - Rhett Butler\" src=\"/uploads/pictures/60bc575e8a15913d6bdc8189/content_1TNT00130.jpg\" style=\"height:533px; width:800px\"></p>\n\n<p><img alt=\"Khách sạn tình yêu - Rhett Butler\" src=\"/uploads/pictures/60bc575e8a15913d6bdc818a/content_1TNT00131.jpg\" style=\"height:742px; width:800px\"></p>\n\n<p><img alt=\"Khách sạn tình yêu - Rhett Butler\" src=\"/uploads/pictures/60bc575f8a15913d6bdc818b/content_1TNT00132.jpg\" style=\"height:800px; width:533px\"></p>\n\n<p><img alt=\"Khách sạn tình yêu - Rhett Butler\" src=\"/uploads/pictures/60bc575f8a15913d6bdc818c/content_1TNT00134.jpg\" style=\"height:533px; width:800px\"></p>\n\n<p><img alt=\"Khách sạn tình yêu - Rhett Butler\" src=\"/uploads/pictures/60bc57608a15913d6bdc818d/content_1TNT00136.jpg\" style=\"height:572px; width:800px\"></p>\n\n<p><img alt=\"Khách sạn tình yêu - Rhett Butler\" src=\"/uploads/pictures/60bc57608a15913d6bdc818e/content_1TNT00135.jpg\" style=\"height:533px; width:800px\"></p>\n\n<p><img alt=\"Khách sạn tình yêu - Rhett Butler\" src=\"/uploads/pictures/60bc57618a15913d6bdc818f/content_1TNT00139.jpg\" style=\"height:533px; width:800px\"></p>\n\n<p><img alt=\"Khách sạn tình yêu - Rhett Butler\" src=\"/uploads/pictures/60bc57618a15913d6bdc8190/content_1TNT00142.jpg\" style=\"height:533px; width:800px\"></p>\n\n<p><img alt=\"Khách sạn tình yêu - Rhett Butler\" src=\"/uploads/pictures/60bc57628a15913d6bdc8191/content_1TNT00144.jpg\" style=\"height:533px; width:800px\"></p>\n\n<p><img alt=\"Khách sạn tình yêu - Rhett Butler\" src=\"/uploads/pictures/60bc57628a15913d6bdc8192/content_1TNT00140.jpg\" style=\"height:532px; width:800px\"></p>\n\n<p><img alt=\"Khách sạn tình yêu - Rhett Butler\" src=\"/uploads/pictures/60bc57628a15913d6bdc8193/content_1TNT00145.jpg\" style=\"height:800px; width:533px\"></p>\n\n<p><img alt=\"Khách sạn tình yêu - Rhett Butler\" src=\"/uploads/pictures/60bc57638a15913d6bdc8194/content_1TNT00146.jpg\" style=\"height:535px; width:800px\"></p>\n</div>\n</div>\n</div>\n"
  },
  "get-high": {
    "slug": "get-high",
    "name": "VIP Room - Get High",
    "roomType": "VIP",
    "badge": "VIP Suite",
    "branchId": "branch-mix-boutique-hotel-20-phuc-la-ha-dong",
    "branchName": "Mix Boutique Hotel 20 Phúc La Hà Đông",
    "branchAddress": "20, P. Phúc La, Hà Đông, Hà Nội",
    "branchPhone": "0383 104 010",
    "branchZalo": "https://zalo.me/0383104010",
    "heroImage": "/uploads/images/60bc667a8a15913d6bdc8263/Get-High.webp",
    "heroSubtitle": "Get High – một không gian lãng mạn và ấm áp, khiến nàng luôn ở trạng thái phấn khích và hưng phấn mỗi lần đặt chân tới có giúp cho chàng dễ dàng chinh phục cảm xúc yêu của nàng hơn? Get High không chỉ giúp các cặp đôi chạm tới được nốt cao nhất tr...",
    "youtubeUrl": "",
    "galleryImages": [
      "/uploads/images/60bc667a8a15913d6bdc8263/Get-High.webp",
      "/uploads/images/60bc667a8a15913d6bdc8264/1TNT00323.jpg",
      "/uploads/images/60bc667a8a15913d6bdc8265/1TNT00329.jpg",
      "/uploads/images/60bc667a8a15913d6bdc8266/1TNT00333.jpg",
      "/uploads/images/60bc667a8a15913d6bdc8267/1TNT00337.jpg",
      "/uploads/images/60bc667a8a15913d6bdc8268/1TNT00339.jpg",
      "/uploads/images/60bc667a8a15913d6bdc8269/1TNT00341.jpg",
      "/uploads/images/60bc667a8a15913d6bdc826a/1TNT00342.jpg",
      "/uploads/images/60bc667a8a15913d6bdc826b/1TNT00343.jpg",
      "/uploads/images/60bc667a8a15913d6bdc826c/1TNT00345.jpg",
      "/uploads/images/60bc667a8a15913d6bdc826d/1TNT00347.jpg",
      "/uploads/images/60bc667a8a15913d6bdc826e/1TNT00349.jpg"
    ],
    "pricing": {
      "hourly": "400.000 VND/2h",
      "extraHour": "80.000 VND/h",
      "overnight": "750.000 VND",
      "fullDay": "1.200.000 VND"
    },
    "conceptTitle": "Concept Độc Bản: VIP Room - Get High",
    "conceptDesc": "Private concept Master room 01 Đổi gió riêng tư 02 Setup chỉn chu Concept phòng Đủ lạ để đổi gió, đủ tinh tế để vẫn thoải mái. Master n Slave không đi theo kiểu trang trí quá ồn. Cảm giác chính là nền đỏ đen ấm, chi tiết Indochine, ánh sáng có chiều sâu và một điểm nhấn S-curve để buổi hẹn có thêm trải nghiệm mới. Tổng đỏ đen huyền bí Không gian có độ tương phản mạnh, hợp những cặp đôi muốn một buổi hẹn khác nhịp thường ngày. Nội thất Indochine Chi tiết gỗ, họa tiết và ánh sáng tạo cảm giác boutique, sang hơn một phòng nghỉ thông thường. Ghế S-curve Điểm nhấn trải nghiệm riêng của phòng, được bố trí trong tổng thể kín đáo và có gu. Tiện nghi đủ dùng Điều hòa, WiFi, TV giải trí và các tiện ích cơ bản cho thời gian nghỉ theo giờ hoặc qua đêm. Gọi tư vấn phòng Nhắn Zalo xem ảnh thật",
    "perks": [
      {
        "title": "Bồn tắm sục Jacuzzi đôi",
        "desc": "Không gian thư giãn đẳng cấp với bồn tắm sục lãng mạn, nước nóng ấm áp, bọt xà phòng hoa hồng."
      },
      {
        "title": "Ghế tình yêu Tantra cao cấp",
        "desc": "Đường cong công thái học chuẩn chỉn chu, mang đến cảm xúc thăng hoa bất tận cho cặp đôi."
      },
      {
        "title": "Máy chiếu phim Full HD / 4K",
        "desc": "Màn chiếu siêu rộng xem Netflix, YouTube, chill cùng bộ phim lãng mạn yêu thích."
      },
      {
        "title": "Ánh sáng nghệ thuật Mood Light",
        "desc": "Hệ thống đèn neon, trần ngàn sao và tone màu đa sắc tạo nên không khí quyến rũ độc bản."
      },
      {
        "title": "Miễn phí Cosplay & Đạo cụ",
        "desc": "Mượn trang phục hoá trang quyến rũ, đồ chơi tình yêu và Board Game gắn kết miễn phí."
      },
      {
        "title": "Bảo mật thông tin 100%",
        "desc": "Thủ tục check-in kín đáo, nhận phòng riêng tư, bảo vệ thông tin khách hàng tuyệt đối."
      }
    ],
    "faqs": [
      {
        "question": "Phòng VIP Room - Get High có sẵn bồn tắm và máy chiếu không?",
        "answer": "Phòng được trang bị đầy đủ tiện nghi cao cấp theo concept riêng, bao gồm bồn tắm thư giãn, ghế tình yêu Tantra, máy chiếu/Smart TV sắc nét và hệ thống đèn lãng mạn."
      },
      {
        "question": "Tôi có cần đặt cọc trước khi đến nhận phòng không?",
        "answer": "Nếu bạn đến trong vòng 15-20 phút, Mix Hotel sẽ giữ phòng miễn phí không cần cọc. Nếu bạn đặt trước nhiều giờ hoặc qua đêm, vui lòng cọc trước để đảm bảo phòng được giữ 100%."
      },
      {
        "question": "Mix Boutique Hotel có hỗ trợ trang trí tiệc kỷ niệm, sinh nhật không?",
        "answer": "Có! Mix Hotel có 4 gói decor chuyên nghiệp gồm nến, hoa hồng, bong bóng, bánh kem và rượu vang ngoại nhập. Hãy báo trước ít nhất 2-4 tiếng để nhân viên setup hoàn hảo nhất."
      },
      {
        "question": "Khách sạn có cho mượn đồ Cosplay và Board Game tình yêu không?",
        "answer": "Mix Hotel hoàn toàn miễn phí mượn trang phục Cosplay quyến rũ, phụ kiện BDSM tinh tế và bộ Board Game thử thách tình yêu cho tất cả khách hàng lưu trú."
      }
    ],
    "storyHtml": "\n<div class=\"container\">\n<div class=\"content-frame\">\n\n<div class=\"content-body size-1vw data_contents\">\n<p style=\"text-align:center\"><img alt=\"Khách sạn tình yêu - Get High\" src=\"/uploads/pictures/60bc65d48a15913d6bdc824b/content_1TNT00323.jpg\"></p>\n\n<p style=\"text-align:center\"><img alt=\"Khách sạn tình yêu - Get High\" src=\"/uploads/pictures/60bc65d48a15913d6bdc824a/content_1TNT00329.jpg\" style=\"height:533px; width:800px\"></p>\n\n<p style=\"text-align:center\"><img alt=\"Khách sạn tình yêu - Get High\" src=\"/uploads/pictures/60bc65d48a15913d6bdc824c/content_1TNT00333.jpg\" style=\"height:533px; width:800px\"></p>\n\n<p style=\"text-align:center\"><img alt=\"Khách sạn tình yêu - Get High\" src=\"/uploads/pictures/60bc65d68a15913d6bdc824d/content_1TNT00337.jpg\" style=\"height:800px; width:533px\"></p>\n\n<p style=\"text-align:center\"><img alt=\"Khách sạn tình yêu - Get High\" src=\"/uploads/pictures/60bc65d68a15913d6bdc824e/content_1TNT00341.jpg\" style=\"height:800px; width:533px\"></p>\n\n<p style=\"text-align:center\"><img alt=\"Khách sạn tình yêu - Get High\" src=\"/uploads/pictures/60bc65d78a15913d6bdc824f/content_1TNT00339.jpg\" style=\"height:533px; width:800px\"></p>\n\n<p style=\"text-align:center\"><img alt=\"Khách sạn tình yêu - Get High\" src=\"/uploads/pictures/60bc65d78a15913d6bdc8250/content_1TNT00342.jpg\" style=\"height:533px; width:800px\"></p>\n\n<p style=\"text-align:center\"><img alt=\"Khách sạn tình yêu - Get High\" src=\"/uploads/pictures/60bc65d98a15913d6bdc8251/content_1TNT00343.jpg\" style=\"height:533px; width:800px\"></p>\n\n<p style=\"text-align:center\"><img alt=\"Khách sạn tình yêu - Get High\" src=\"/uploads/pictures/60bc65d98a15913d6bdc8252/content_1TNT00345.jpg\" style=\"height:533px; width:800px\"></p>\n\n<p style=\"text-align:center\"><img alt=\"Khách sạn tình yêu - Get High\" src=\"/uploads/pictures/60bc65da8a15913d6bdc8253/content_1TNT00347.jpg\" style=\"height:533px; width:800px\"></p>\n\n<p style=\"text-align:center\"><img alt=\"Khách sạn tình yêu - Get High\" src=\"/uploads/pictures/60bc65da8a15913d6bdc8254/content_1TNT00349.jpg\" style=\"height:535px; width:800px\"></p>\n\n<p style=\"text-align:center\"><img alt=\"Khách sạn tình yêu - Get High\" src=\"/uploads/pictures/60bc65dc8a15913d6bdc8255/content_1TNT00352.jpg\" style=\"height:533px; width:800px\"></p>\n\n<p style=\"text-align:center\"><img alt=\"Khách sạn tình yêu - Get High\" src=\"/uploads/pictures/60bc65dc8a15913d6bdc8256/content_1TNT00353.jpg\" style=\"height:535px; width:800px\"></p>\n\n<p style=\"text-align:center\"><img alt=\"Khách sạn tình yêu - Get High\" src=\"/uploads/pictures/60bc65dc8a15913d6bdc8257/content_1TNT00350.jpg\" style=\"height:533px; width:800px\"></p>\n\n<p style=\"text-align:center\"><img alt=\"Khách sạn tình yêu - Get High\" src=\"/uploads/pictures/60bc65de8a15913d6bdc8258/content_1TNT00356.jpg\" style=\"height:535px; width:800px\"></p>\n\n<p style=\"text-align:center\"><img alt=\"Khách sạn tình yêu - Get High\" src=\"/uploads/pictures/60bc65df8a15913d6bdc8259/content_1TNT00360.jpg\" style=\"height:533px; width:800px\"></p>\n\n<p style=\"text-align:center\"><img alt=\"Khách sạn tình yêu - Get High\" src=\"/uploads/pictures/60bc65df8a15913d6bdc825a/content_1TNT00357.jpg\" style=\"height:533px; width:800px\"></p>\n\n<p style=\"text-align:center\"><img alt=\"Khách sạn tình yêu - Get High\" src=\"/uploads/pictures/60bc65df8a15913d6bdc825b/content_1TNT00361.jpg\" style=\"height:533px; width:800px\"></p>\n\n<p style=\"text-align:center\"><img alt=\"Khách sạn tình yêu - Get High\" src=\"/uploads/pictures/60bc65e08a15913d6bdc825c/content_1TNT00370.jpg\" style=\"height:534px; width:800px\"></p>\n\n<p style=\"text-align:center\"><img alt=\"Khách sạn tình yêu - Get High\" src=\"/uploads/pictures/60bc65e18a15913d6bdc825d/content_1TNT00364.jpg\" style=\"height:533px; width:800px\"></p>\n\n<p style=\"text-align:center\"><img alt=\"Khách sạn tình yêu - Get High\" src=\"/uploads/pictures/60bc65e18a15913d6bdc825e/content_1TNT00373.jpg\" style=\"height:533px; width:800px\"></p>\n\n<p style=\"text-align:center\"><img alt=\"Khách sạn tình yêu - Get High\" src=\"/uploads/pictures/60bc65e38a15913d6bdc825f/content_1TNT00382.jpg\" style=\"height:800px; width:533px\"></p>\n\n<p style=\"text-align:center\"><img alt=\"Khách sạn tình yêu - Get High\" src=\"/uploads/pictures/60bc65e38a15913d6bdc8260/content_1TNT00377.jpg\" style=\"height:533px; width:800px\"></p>\n\n<p style=\"text-align:center\"><img alt=\"Khách sạn tình yêu - Get High\" src=\"/uploads/pictures/60bc65e38a15913d6bdc8261/content_1TNT00376.jpg\" style=\"height:533px; width:800px\"></p>\n\n<p style=\"text-align:center\"><img alt=\"Khách sạn tình yêu - Get High\" src=\"/uploads/pictures/60bc65e48a15913d6bdc8262/content_1TNT00385.jpg\" style=\"height:533px; width:800px\"></p>\n</div>\n</div>\n</div>\n"
  },
  "the-lust": {
    "slug": "the-lust",
    "name": "VIP Room - The Lust",
    "roomType": "VIP",
    "badge": "VIP Suite",
    "branchId": "branch-mix-boutique-hotel-20-phuc-la-ha-dong",
    "branchName": "Mix Boutique Hotel 20 Phúc La Hà Đông",
    "branchAddress": "20, P. Phúc La, Hà Đông, Hà Nội",
    "branchPhone": "0383 104 010",
    "branchZalo": "https://zalo.me/0383104010",
    "heroImage": "/uploads/images/60bc60638a15913d6bdc8216/the-lust.webp",
    "heroSubtitle": "Tôi đang ở trạng thái Lust in Love với em. Mọi thứ về em đều hoàn hảo và thu hút tôi, khuôn mặt em, làn môi mềm ấm nóng của em và cả cơ thể hoàn mỹ của em nữa luôn châm ngòi kích hoạt ham muốn và thèm khát yêu thương của tôi dành cho em. Không biế...",
    "youtubeUrl": "",
    "galleryImages": [
      "/uploads/images/60bc60638a15913d6bdc8216/the-lust.webp",
      "/uploads/images/60bc60638a15913d6bdc8217/1tn20210518_115437.jpg",
      "/uploads/images/60bc60638a15913d6bdc8218/1TNT00307.jpg",
      "/uploads/images/60bc60638a15913d6bdc8219/1TNT00311.jpg",
      "/uploads/images/60bc60638a15913d6bdc821a/1TNT00316.jpg",
      "/uploads/images/60bc60638a15913d6bdc821b/1TNT00317.jpg",
      "/uploads/images/60bc60638a15913d6bdc821c/1TNT00319.jpg"
    ],
    "pricing": {
      "hourly": "400.000 VND/2h",
      "extraHour": "80.000 VND/h",
      "overnight": "750.000 VND",
      "fullDay": "1.200.000 VND"
    },
    "conceptTitle": "Concept Độc Bản: VIP Room - The Lust",
    "conceptDesc": "Private concept Master room 01 Đổi gió riêng tư 02 Setup chỉn chu Concept phòng Đủ lạ để đổi gió, đủ tinh tế để vẫn thoải mái. Master n Slave không đi theo kiểu trang trí quá ồn. Cảm giác chính là nền đỏ đen ấm, chi tiết Indochine, ánh sáng có chiều sâu và một điểm nhấn S-curve để buổi hẹn có thêm trải nghiệm mới. Tổng đỏ đen huyền bí Không gian có độ tương phản mạnh, hợp những cặp đôi muốn một buổi hẹn khác nhịp thường ngày. Nội thất Indochine Chi tiết gỗ, họa tiết và ánh sáng tạo cảm giác boutique, sang hơn một phòng nghỉ thông thường. Ghế S-curve Điểm nhấn trải nghiệm riêng của phòng, được bố trí trong tổng thể kín đáo và có gu. Tiện nghi đủ dùng Điều hòa, WiFi, TV giải trí và các tiện ích cơ bản cho thời gian nghỉ theo giờ hoặc qua đêm. Gọi tư vấn phòng Nhắn Zalo xem ảnh thật",
    "perks": [
      {
        "title": "Bồn tắm sục Jacuzzi đôi",
        "desc": "Không gian thư giãn đẳng cấp với bồn tắm sục lãng mạn, nước nóng ấm áp, bọt xà phòng hoa hồng."
      },
      {
        "title": "Ghế tình yêu Tantra cao cấp",
        "desc": "Đường cong công thái học chuẩn chỉn chu, mang đến cảm xúc thăng hoa bất tận cho cặp đôi."
      },
      {
        "title": "Máy chiếu phim Full HD / 4K",
        "desc": "Màn chiếu siêu rộng xem Netflix, YouTube, chill cùng bộ phim lãng mạn yêu thích."
      },
      {
        "title": "Ánh sáng nghệ thuật Mood Light",
        "desc": "Hệ thống đèn neon, trần ngàn sao và tone màu đa sắc tạo nên không khí quyến rũ độc bản."
      },
      {
        "title": "Miễn phí Cosplay & Đạo cụ",
        "desc": "Mượn trang phục hoá trang quyến rũ, đồ chơi tình yêu và Board Game gắn kết miễn phí."
      },
      {
        "title": "Bảo mật thông tin 100%",
        "desc": "Thủ tục check-in kín đáo, nhận phòng riêng tư, bảo vệ thông tin khách hàng tuyệt đối."
      }
    ],
    "faqs": [
      {
        "question": "Phòng VIP Room - The Lust có sẵn bồn tắm và máy chiếu không?",
        "answer": "Phòng được trang bị đầy đủ tiện nghi cao cấp theo concept riêng, bao gồm bồn tắm thư giãn, ghế tình yêu Tantra, máy chiếu/Smart TV sắc nét và hệ thống đèn lãng mạn."
      },
      {
        "question": "Tôi có cần đặt cọc trước khi đến nhận phòng không?",
        "answer": "Nếu bạn đến trong vòng 15-20 phút, Mix Hotel sẽ giữ phòng miễn phí không cần cọc. Nếu bạn đặt trước nhiều giờ hoặc qua đêm, vui lòng cọc trước để đảm bảo phòng được giữ 100%."
      },
      {
        "question": "Mix Boutique Hotel có hỗ trợ trang trí tiệc kỷ niệm, sinh nhật không?",
        "answer": "Có! Mix Hotel có 4 gói decor chuyên nghiệp gồm nến, hoa hồng, bong bóng, bánh kem và rượu vang ngoại nhập. Hãy báo trước ít nhất 2-4 tiếng để nhân viên setup hoàn hảo nhất."
      },
      {
        "question": "Khách sạn có cho mượn đồ Cosplay và Board Game tình yêu không?",
        "answer": "Mix Hotel hoàn toàn miễn phí mượn trang phục Cosplay quyến rũ, phụ kiện BDSM tinh tế và bộ Board Game thử thách tình yêu cho tất cả khách hàng lưu trú."
      }
    ],
    "storyHtml": "\n<div class=\"container\">\n<div class=\"content-frame\">\n\n<div class=\"content-body size-1vw data_contents\">\n<p><img alt=\"Khách sạn tình yêu - The Lust\" src=\"/uploads/pictures/60bc60398a15913d6bdc8210/content_1tn20210518_115437.jpg\"></p>\n\n<p><img alt=\"Khách sạn tình yêu - The Lust\" src=\"/uploads/pictures/60bc603a8a15913d6bdc8211/content_1TNT00311.jpg\" style=\"height:800px; width:535px\"></p>\n\n<p><img alt=\"Khách sạn tình yêu - The Lust\" src=\"/uploads/pictures/60bc603a8a15913d6bdc8212/content_1TNT00307.jpg\"></p>\n\n<p><img alt=\"Khách sạn tình yêu - The Lust\" src=\"/uploads/pictures/60bc603a8a15913d6bdc8213/content_1TNT00316.jpg\" style=\"height:535px; width:800px\"></p>\n\n<p><img alt=\"Khách sạn tình yêu - The Lust\" src=\"/uploads/pictures/60bc603b8a15913d6bdc8214/content_1TNT00317.jpg\" style=\"height:535px; width:800px\"></p>\n\n<p><img alt=\"Khách sạn tình yêu - The Lust\" src=\"/uploads/pictures/60bc603b8a15913d6bdc8215/content_1TNT00319.jpg\" style=\"height:535px; width:800px\"></p>\n</div>\n</div>\n</div>\n"
  }
};
