export interface RoomItem {
  name: string;
  link: string;
  price: string;
  desc: string;
  image: string;
}

export interface BranchItem {
  id: string;
  image: string;
  badge: string;
  area: string;
  name: string;
  address: string;
  notice: string;
  tags: string[];
  roomTitle: string;
  rooms: RoomItem[];
}

export interface FormRoomOption {
  value: string;
  text: string;
  price1?: string;
  price2?: string;
  price3?: string;
  pricesub?: string;
}

export const BRANCHES_DATA: BranchItem[] = [
  {
    "id": "branch-mix-boutique-premium-hotel",
    "image": "/storage/jk/1v/jk1vjpywygthniouk288ksn121rl_banner-home.jpg",
    "badge": "Mix Boutique Premium",
    "area": "Huỳnh Thúc Kháng",
    "name": "Mix Boutique Premium",
    "address": "Số 8 ngách 29 ngõ 49 Huỳnh Thúc Kháng, phường Láng, Hà Nội",
    "notice": "Đặt phòng tại chi nhánh này nếu bạn muốn chọn đúng khu vực, đúng concept và không nhầm sang chi nhánh khác.",
    "tags": [
      "22 phòng",
      "Superior từ 199k",
      "Deluxe từ 300k",
      "VIP từ 400k"
    ],
    "roomTitle": "Tất cả phòng tại Mix Boutique Premium",
    "rooms": [
      {
        "name": "Room 001 - Bad girl",
        "link": "/khach-san-tinh-yeu/bad-girl/",
        "price": "Giá từ: 300.000 VND/2h",
        "desc": "Bad girl mang đến không gian đầy lãng mạn và quyến rũ với tông màu đen chủ đạo được làm nổi bật bởi ánh đèn neon tím huyền ảo. Chiếc giường tròn lớn phủ ga đỏ rực đặt ngay trung tâm, mời gọi các cặp đôi tận hưởng những khoảnh khắc riêng tư ngọt ngào. Bên cạnh đó, chiếc sofa da đen kiểu cách và các chi tiết trang trí lớn trên tường cùng dòng chữ neon tạo thêm sự táo bạo và cá tính cho căn phòng. Ánh sáng dịu nhẹ hắt ra từ các ô cửa sổ trang trí càng làm tăng thêm vẻ ấm cúng và kín đáo, hứa hẹn một đêm đáng nhớ cho các cặp tình nhân.",
        "image": "/storage/do/4j/do4jgj8crqn9ct3kjme1flp1l9bj_001.jpg"
      },
      {
        "name": "VIP Room 102 - Inferno",
        "link": "/khach-san-tinh-yeu/inferno/",
        "price": "Giá từ: 400.000 VND/2h",
        "desc": "Inferno lấy gam màu đỏ và đen làm chủ đạo, tạo nên một bầu không khí rực lửa và đầy đam mê. Trung tâm căn phòng là chiếc giường tròn lớn được đặt trong một chiếc lồng chim màu đỏ nổi bật, gợi lên sự bí ẩn và quyến rũ. Gương được sử dụng rộng khắp để tạo cảm giác không gian rộng lớn và phản chiếu ánh sáng từ đèn LED tím hồng, làm tăng thêm vẻ lãng mạn. Cạnh đó là một bồn tắm lớn màu đỏ trắng, lý tưởng cho những phút giây thư giãn riêng tư. Với thiết kế độc đáo và táo bạo, phòng \"Inferno\" này hứa hẹn sẽ mang đến trải nghiệm khó quên cho các cặp đôi.",
        "image": "/storage/gf/yb/gfybu3xn4qupjynq9xq9t8p0gymy_102.jpg"
      },
      {
        "name": "Room 201 - Master n Slave",
        "link": "/khach-san-tinh-yeu/master-n-slave/",
        "price": "Giá từ: 300.000 VND/2h",
        "desc": "Master 'n' Slave được thiết kế với phong cách cổ điển và đầy quyền lực, lấy tông màu đỏ đen làm chủ đạo. Điểm nhấn của căn phòng là chiếc giường bốn cọc gỗ lớn, tạo nên một không gian vừa sang trọng vừa bí ẩn. Rèm cửa nhung đỏ buông rủ cùng những chi tiết trang trí sắt uốn lượn mang lại cảm giác vương giả. Một chiếc ghế tình yêu chuyên dụng màu đen và các chi tiết trang trí khác được sắp đặt một cách tinh tế, thể hiện rõ chủ đề phòng. Tổng thể, phòng Master 'n' Slave tạo ra một không gian đầy kịch tính và lãng mạn, rất phù hợp cho những cặp đôi muốn khám phá những trải nghiệm mới lạ.",
        "image": "/storage/tp/c1/tpc1w7dl3b8d3jsn0997qcgcy9zt_201-master-n-slave.jpg"
      },
      {
        "name": "Room 202 - Galaxy",
        "link": "/khach-san-tinh-yeu/galaxy/",
        "price": "Giá từ: 199.000 VND/2h",
        "desc": "Phòng Galaxy đưa các cặp đôi vào một không gian lãng mạn như dải ngân hà. Căn phòng được trang trí với gam màu tối, tạo cảm giác như bầu trời đêm. Điểm nhấn là trần nhà được treo đầy những chuỗi đèn lấp lánh mô phỏng các vì sao, cùng với đèn neon hình đôi môi, tạo nên một không gian vừa huyền ảo vừa lãng mạn. Giường ngủ lớn được đặt giữa phòng, đối diện là tấm gương lớn, giúp căn phòng có cảm giác rộng rãi hơn. Với thiết kế độc đáo này, phòng Galaxy chắc chắn sẽ mang đến một trải nghiệm đáng nhớ cho các cặp đôi.",
        "image": "/storage/63/r7/63r7hvzdxw4kznzy14srvy4fkwdo_202-galaxy.jpg"
      },
      {
        "name": "VIP Room 203 - Eden",
        "link": "/khach-san-tinh-yeu/eden/",
        "price": "Giá từ: 400.000 VND/2h",
        "desc": "Eden là một ốc đảo xanh tươi giữa lòng thành phố, lấy cảm hứng từ khu vườn địa đàng. Căn phòng được bao phủ bởi cây xanh và dây leo giả, tạo cảm giác gần gũi với thiên nhiên, mang lại sự thư thái và tươi mát. Chiếc giường tròn màu trắng tinh khôi đặt ở trung tâm, hài hòa với những chiếc đèn mây tre đan hình nón và những chiếc lá cọ trang trí. Các chi tiết gạch ốp tường cổ điển ở khu vực lavabo và bồn tắm gỗ tự nhiên mang lại cảm giác mộc mạc và hoài cổ. Tổng thể, phòng \"Eden\" là một không gian lý tưởng cho các cặp đôi tìm kiếm sự bình yên, lãng mạn và hòa mình vào thiên nhiên.",
        "image": "/storage/6f/g3/6fg32jj8v1f0e9e4gl0ycu6rt38m_203-eden.jpg"
      },
      {
        "name": "Room 301 - Lolita",
        "link": "/khach-san-tinh-yeu/lolita/",
        "price": "Giá từ: 300.000 VND/2h",
        "desc": "Lolita là một không gian lãng mạn và dịu dàng, lấy cảm hứng từ phong cách Lolita ngọt ngào. Căn phòng được bao phủ bởi sắc hồng pastel, từ tường, rèm cửa đến các chi tiết nội thất, tạo nên một bầu không khí mơ mộng và đầy thơ mộng. Trung tâm căn phòng là chiếc giường bốn cọc, được trang trí bằng những dây hoa hồng và hoa nhỏ màu vàng, tạo cảm giác như một khu vườn cổ tích. Một chiếc ghế tình yêu kiểu cách với họa tiết hoa văn được đặt cạnh giường, cùng với chiếc gương soi toàn thân hình đám mây, làm tăng thêm sự nữ tính và đáng yêu. Phòng Lolita này là lựa chọn hoàn hảo cho những cặp đôi yêu thích sự lãng mạn và ngọt ngào.",
        "image": "/storage/wy/79/wy79insca4in9diukw7qq8zdes9l_301-lolita.jpg"
      },
      {
        "name": "Room 302 - Karma",
        "link": "/khach-san-tinh-yeu/karma/",
        "price": "Giá từ: 199.000 VND/2h",
        "desc": "Karma được thiết kế theo phong cách gợi cảm và huyền bí, với tông màu đỏ nóng bỏng làm chủ đạo. Điểm nhấn độc đáo của căn phòng là những bức tranh Kamasutra được sắp xếp dọc theo bức tường phía đầu giường và trên trần nhà, tạo nên một không gian đầy tính nghệ thuật và kích thích. Chiếc giường tròn lớn màu trắng tinh khôi tương phản nổi bật với tông đỏ của căn phòng. Các chi tiết trang trí như đèn chùm pha lê và gương phản chiếu khắp nơi càng làm tăng thêm vẻ sang trọng và lãng mạn. Phòng Karma hứa hẹn mang đến một trải nghiệm đầy đam mê và khám phá cho các cặp đôi.",
        "image": "/storage/e8/fo/e8fo0t2jei3ooib6yy7h4x2zigdc_302-karma.jpg"
      },
      {
        "name": "VIP Room 303 - Scarlet",
        "link": "/khach-san-tinh-yeu/303-scarlet/",
        "price": "Giá từ: 400.000 VND/2h",
        "desc": "Scarlet được thiết kế với phong cách mạnh mẽ và táo bạo, kết hợp giữa gam màu đỏ rực rỡ và đen huyền bí. Trung tâm căn phòng là chiếc giường tròn lớn màu đỏ, được đặt trên một bệ nâng lót nhung, tạo cảm giác sang trọng và lôi cuốn. Tường phòng được trang trí bằng các đường vân nổi, kết hợp với ánh sáng đỏ của đèn LED, tạo ra không gian đầy kịch tính. Điểm nhấn là biểu tượng chữ X lớn phát sáng và những chiếc gương được bố trí khắp nơi, phản chiếu ánh sáng và tạo cảm giác không gian rộng hơn. Với một bồn tắm lộ thiên và những chiếc ghế sofa da đen, phòng Scarlet này là sự lựa chọn hoàn hảo cho những cặp đôi muốn có một đêm đầy đam mê và lãng mạn.",
        "image": "/storage/4x/5q/4x5qwkkvxx3pz7350scsvbrt1j9x_303-scarlet.jpg"
      },
      {
        "name": "VIP Room 401 - Katana",
        "link": "/khach-san-tinh-yeu/katana/",
        "price": "Giá từ: 400.000 VND/2h",
        "desc": "Katana được thiết kế theo phong cách Nhật Bản truyền thống nhưng cũng không kém phần hiện đại và lãng mạn. Căn phòng lấy tông màu đỏ đậm và đen làm chủ đạo, tạo nên một không gian ấm cúng và gợi cảm. Điểm nhấn là bức tranh Geisha lớn phía đầu giường và những chiếc đèn lồng đỏ trắng đặc trưng, gợi nhớ văn hóa xứ Phù Tang. Chiếc giường thấp theo kiểu Nhật, kết hợp với các chi tiết trang trí như những tấm gỗ ghép hay biểu tượng chữ X phát sáng, tạo nên một sự hòa quyện độc đáo giữa truyền thống và hiện đại. Phòng Katana là lựa chọn lý tưởng cho các cặp đôi yêu thích văn hóa Á Đông và mong muốn có một trải nghiệm lãng mạn, tinh tế.",
        "image": "/storage/q2/a6/q2a6jjsum90li8gzayh55emvp9uw_401-katana.jpg"
      },
      {
        "name": "Room 402 - Amora",
        "link": "/khach-san-tinh-yeu/amora/",
        "price": "Giá từ: 300.000 VND/2h",
        "desc": "Amora mang đến một không gian lãng mạn và gần gũi với thiên nhiên. Căn phòng được thiết kế theo phong cách ấm áp, với trần nhà bằng gỗ và những dây đèn lấp lánh như bầu trời sao, tạo cảm giác thư giãn và mơ mộng. Điểm độc đáo của phòng là chiếc cửa kính lớn nhìn ra một khu vườn nhỏ với những viên đá và cây xanh, mang thiên nhiên vào trong không gian riêng tư. Nội thất tối giản, với chiếc giường lớn và các chi tiết trang trí như gương ốp tường và đèn ngủ đơn giản, tạo nên một không gian thoáng đãng và tinh tế. Phòng Amora là lựa chọn hoàn hảo cho những cặp đôi muốn tận hưởng một kỳ nghỉ lãng mạn, nhẹ nhàng.",
        "image": "/storage/1e/ak/1eakhk4fdk9spyiu1er2dch50zd7_402-amora.jpg"
      },
      {
        "name": "VIP Room 469 - Cloud Nine",
        "link": "/khach-san-tinh-yeu/cloud-nine/",
        "price": "Giá từ: 400.000 VND/2h",
        "desc": "Cloud Nine mang đến một không gian lãng mạn và hiện đại, lấy cảm hứng từ bầu trời đêm đầy sao. Căn phòng được thiết kế với trần nhà ốp gỗ và trang trí bằng hàng trăm chiếc đèn nhỏ lấp lánh, tạo cảm giác như đang nằm dưới dải ngân hà. Điểm đặc biệt của phòng là một chiếc bồn tắm lớn đặt ngay trong không gian mở, đối diện với giường ngủ, lý tưởng cho những phút giây thư giãn riêng tư của các cặp đôi. Ngoài ra, chiếc máy chiếu lớn với màn hình chiếu cực rộng mang lại trải nghiệm xem phim chân thực như rạp chiếu phim ngay trong phòng. Với thiết kế độc đáo và tiện nghi hiện đại, phòng \"Cloud Nine\" hứa hẹn sẽ mang lại một đêm đáng nhớ cho các cặp đôi.",
        "image": "/storage/qf/ci/qfcivbquyw6bbxs9vjeufbti5k4t_469-moonlit-love.jpg"
      }
    ]
  },
  {
    "id": "branch-mix-boutique-hotel-256b-dang-tien-dong",
    "image": "/storage/76/50/7650f9jp65mjs6holbr9rv6psvup_banner-home.jpg",
    "badge": "Mix Boutique Hotel 256B Đặng Tiến Đông",
    "area": "Huỳnh Thúc Kháng",
    "name": "Mix Boutique Hotel 256B Đặng Tiến Đông",
    "address": "256B Phố Đặng Tiến Đông, Ô Chợ Dừa, Hà Nội 100000. Thuận tiện khu Đống Đa.",
    "notice": "Đặt phòng tại chi nhánh này nếu bạn muốn chọn đúng khu vực, đúng concept và không nhầm sang chi nhánh khác.",
    "tags": [
      "22 phòng",
      "Superior từ 199k",
      "Deluxe từ 300k",
      "VIP từ 400k"
    ],
    "roomTitle": "Tất cả phòng tại Mix Boutique Hotel 256B Đặng Tiến Đông",
    "rooms": [
      {
        "name": "Room 00 - Hidden Frenzy",
        "link": "/khach-san-tinh-yeu/hidden-frenzy/",
        "price": "Giá từ: 300.000 VND/2h",
        "desc": "Rực rỡ và nóng bỏng là cảm giác đầu tiên khi đặt chân vào căn phòng Hidden Frenzy. Sự khoải cảm sẽ bùng cháy với những cảm xúc thăng hoa mà căn phòng đầy thú vị này manh đến. Với giường tròn King Size và ghế tình yêu là nơi chứ đựng sự đê mê và khoải lạc của các cặp đôi. Dụng cụ yêu luôn được trang bị đầy đủ cho các nàng cùng các chàng thử cảm giác mới lạ. Gương áp trần sẽ là bằng chứng yêu của các cuộc vui bùng cháy và các bạn có thể ngắm khi bạn và người cùng nhau hành động. Không gian tràn hương vị tình ái của căn phòng là điểm nhấn quan trọng cho cuộc vui thêm tròn vị. Tại Hidden Frenzy, chúng tôi luôn trân trọng mọi giây phút bùng cháy và rực rỡ nhất của hai trái tim vàng son",
        "image": "/uploads/images/600ac2278a159118a146eab7/hidden-frenzy__2_.webp"
      },
      {
        "name": "VIP 01 - Oasis",
        "link": "/khach-san-tinh-yeu/oasis/",
        "price": "Giá từ: 400.000 VND/2h",
        "desc": "Nét đặc biệt tạo nên căn phòng Oasis là không gian thư thái tạo nên sự thoải mái khi yêu. Với tông trắng là chủ đạo của căn phòng cùng với những ánh đèn vàng là thứ thu hút và nhen nhóp đóm lửa đang rực cháy của hai trái tim. Giường trắng tinh khôi vừa thơ ngây nhưng đấy lại là nơi quyên rũ mọi cảm xúc trở nên hư hỏng. Ghế treo là nơi có thể tâm sự mỗi lúc nhớ nhau nhưng cũng là nơi vô cùng thú vị nếu bạn muốn thử cảm giác mới. Ghế tình yêu có thể giúp bạn hiểu thêm về tư vị sắc thái khi yêu. Còn gì tuyệt vời hơn khi vào căn phòng mà có thể tạo ngay cho bạn cảm giác chỉ muốn yêu. Đến với Oasis, bạn sẽ được đắm chìm vào sự thái thái đến khoái lạc mà chưa từng có ở nơi đâu",
        "image": "/uploads/images/600ac3df8a159118a146eac0/oasis.webp"
      },
      {
        "name": "Room 02 - Bad Boy",
        "link": "/khach-san-tinh-yeu/bad-boy/",
        "price": "Giá từ: 300.000 VND/2h",
        "desc": "Nếu bạn muốn tìm một căn phòng với đầy sự hư hỏng nhưng lại rất sang trọng thì hãy đến với Bad Boy. Căn phòng với nhiều hương vị tình ái và sự quyến rũ vô hình làm cho bạn chỉ muốn yêu ngay khi vô phòng. Với thiết kế đặc biệt và tông đỏ chủ đạo, căn phòng toát lên một vẻ bí ẩn nhưng đầy tính khiêu gợi đấy nhé.  Chiếc giường nằm gọn trong chiếc lồng sắc tạo cảm giác táo bạo hơn khi yêu. Mọi dụng cụng yêu là điểm nhấn cho cuộc vui thêm rực cháy, gương áp trần là nhân chứng vô hình khi hai trái tìm hoà chung một nhịp đập. Sắc đỏ không chỉ mang lại sự bùng cháy là còn là không gian lãng mạn tạo nên cuộc yêu hoàn hảo. Với Bad Boy, mọi khoảng khắc hư hỏng hay thơ dại của bạn cùng được ghi dấu mạnh mẽ không phai",
        "image": "/uploads/images/600ac5388a159118a146eac9/bad-boy__2_.webp"
      },
      {
        "name": "VIP 03 - Lover",
        "link": "/khach-san-tinh-yeu/lover/",
        "price": "Giá từ: 400.000 VND/2h",
        "desc": "Sự kiều diễm và xa hoa là hai từ miêu tả trọn vẹn vẻ đẹp của căn phòng Lover. Lover có không gian mê hoặc tinh người với sắc đỏ xen lẫn vào đó là một chút trắng mờ ảo. Giường King size là nơi đắm chìm của mọi cảm xúc rực cháy và thắng hoa. Phòng tắm được trang bị vách ngắn trong suốt cung với đó là bồn tắm xa hoa sẽ cho đôi bạn thêm gần nhau hơn. Ghế tình yêu và ghế sofa là nơi mọi tư thế khó được lên ngôi. Cùng với đó căn phòng coa view nhìn thẳng ra hồ tạo cảm giác lãng mạn và gợi cảm hơn khi yêu. Tại Lover, những phút giây xa ngã của bạn đều là sự kiều diễm, quyến rũ đến động lòng người",
        "image": "/uploads/images/600bce438a159118a146eb32/lover__4_.webp"
      },
      {
        "name": "Room 04 - After Sunset",
        "link": "/khach-san-tinh-yeu/after-sunset/",
        "price": "Giá từ: 300.000 VND/2h",
        "desc": "Sự trang trọng và quí tộc chỉ có thể ở căn phòng After Sunset. Tại đây, bạn sẽ là những nhà thường lưu học cách ăn chơi theo kiểu xa hoa. Giường King Size là mơi lý tưởng bắt đầu cho cuộc yêu đầy máu lửa. Ghế tình yêu thử thách độ dẻo dai của các cặp đôi và gương áp trần soi sáng hai cá thể đang hoà thành một.  Với thiết kế cổ điển sẽ làm cho cuộc vui của bạn thêm phần tuyệt sắc và hoa lệ. Background màu đỏ cháy sẽ thêm phần kích thích và tạo cảm giác nóng và đầy máu lửa cho cuộc vui thêm phận thăng hoa. Ở After Sunset, mọi cuộc vui của bạn sẽ là niềm vui của chúng tôi",
        "image": "/uploads/images/600bd0208a159118a146eb3b/after-sunset__1_.webp"
      },
      {
        "name": "VIP 05 - Kissing",
        "link": "/khach-san-tinh-yeu/kissing/",
        "price": "Giá từ: 400.000 VND/2h",
        "desc": "Sắc đỏ rức cháy là điểm thu hút mạnh mẽ của căn phòng mang tên Kissing. Đến với Kissing, bạn sẽ được trải nghiệm những điều mới lạ và khoái cảm khi yêu. Giường tròn độc đáo với phòng cách quí tộc là nơi bạn cùng người ấy thoả sức lăn tròn ở một tầm cao mới. Bồn tắm sủi bọt bông mịn cùng với view ngắm toàn cảnh thành phố thì chỉ có hai từ mê đắm. Ghế tình yêu cho bạn cùng người ấy thử độ dẻo dai trong mọi tư thế. Không gian ấm cúng của Kissing sẽ bắt trọn từng nhịp đập của hai trái tim đang bùng cháy bên nhau",
        "image": "/uploads/images/600bd1c98a159118a146eb45/kissing__3_.webp"
      },
      {
        "name": "Room 06 - Lollipop",
        "link": "/khach-san-tinh-yeu/lollipop/",
        "price": "Giá từ: 300.000 VND/2h",
        "desc": "Ngọt ngào và lãng mạn như nhưng bộ phim mỹ sẽ có ngay tại căn phòng Lollipop. Căn phòng đáng yêu với điểm nhấn là chiếc giường hồng màu tím mộng mơ như những nàng công chúa. Được vui đùa trên chiếc giường ngọt ngào ấy quả thật không còn gì hoàn hảo hơn. Không gian như một chiếc lâu đài thu nhỏ sẽ tạo cho bạn như những hoàng tử và công chúa được thoả mình yêu nhau. Gương áp trần soi sáng bóng dáng của hai người với ngọn lựa đê mê. Mọi phút giây ngọt ngào và thăng hoa của bạn sẽ được lưu trữ tại căn phòng mang tên Lollipop đáng yêu",
        "image": "/uploads/images/600bd2fa8a159118a146eb51/lollipop__4_.webp"
      },
      {
        "name": "VIP 07 - On Top",
        "link": "/khach-san-tinh-yeu/on-top/",
        "price": "Giá từ: 400.000 VND/2h",
        "desc": "Tình như chốn thiêng đường chỉ có tại căn phòng mang tên On Top. Mang phong cách của một Maldives thu nhỏ lãng mạn và phong tình. Chiếc giường với thiết kế độc đáo là nơi chiến trường tình ái sẽ xảy ra. Bồn tăm hiện đại giúp thăng hoa mọi cảm xúc bị kiềm nén. Một chiếc view đỉnh của căn phòng tạo cảm giác khoái lạc hơn khi yêu. Không gian ấm cúng cho những trái tim cần được sưởi ấm tròn vẹn. Nến, hoa và rượu là chất xúc tác hoàn hảo cho khung cảnh thêm đậm chấp tình. Đến với On Top, chúng tôi sẽ cho bạn nhưng cảm giác mới lạ chỉ có ở căn phòng đặc biệt này",
        "image": "/uploads/images/600bd4b68a159118a146eb5b/on-top__8_.webp"
      },
      {
        "name": "Room 08 - Blowj Up",
        "link": "/khach-san-tinh-yeu/blowj-up/",
        "price": "Giá từ: 300.000 VND/2h",
        "desc": "Blowj up là nơi chưa phong vị ngọt ngào cho cuộc tình thêm đổi gió. Với thiết kế đơn giãn, tình tế cùng màu trắng là chủ đạo đã tạo nên sự đơn giãn nhưng rất gợi tình. Giường treo lửng lơ mới lạ làm nên cảm giác thăng hoa và thách thức mọi sự xập xình nhấp nhô khi yêu. Nhà tắm là những tấm kính trong suốt với nhưng chiếc rèm mỏng gợi cảm giác vừa bí ẩn vừa chân thật thu hút mọi cảm xúc. Để có cảm xúc mãnh liệt nhất, đến với Blowj up bạn cùng người ấy sẽ được trải nghiệm những phút giây lắng động hoàn hảo như thể đang bay bổng trên mây",
        "image": "/uploads/images/600bd5d88a159118a146eb67/blowj-up__4_.webp"
      },
      {
        "name": "Room 09 - Lalaland",
        "link": "/khach-san-tinh-yeu/lalaland/",
        "price": "Giá từ: 300.000 VND/2h",
        "desc": "Nơi chứa đựng những chuyện tình cảm ngọt ngào là lãng mạn chỉ có thể là Lalaland. Không hào nhoáng và ồn ào, Lalaland mang lại cảm giác ấm cúng và ngọt ngào của những câu chuyện tình yêu bình dị nhưng cũng đầy kích thích. Không gian sang chảnh theo một cách rất riêng làm nên nét thơ mộng đặc sắc. Giường trái tim độc đáo ấm êm thoả sức lặn lộn trong cuộc chiếc tình yêu. Rạp chiếu có ngay trong phòng vừa tiện lời giải trí lại vừa tiện lợi mà hành động. Những bông hoa xinh được trang trí xung quang cùng với chiếc đu xinh bên cửa sổ làm nên nét mộng mơ của những cuộc yêu nhẹ nhàng. Đến với Lalaland, mọi cảm giác thăng hoa mà bạn có được sẽ tựa như trên chốn thiên đường mộng mơ",
        "image": "/uploads/images/600bd7168a159118a146eb71/lalaland__4_.webp"
      }
    ]
  },
  {
    "id": "branch-mix-boutique-hotel-20-phuc-la-ha-dong",
    "image": "/storage/2b/8n/2b8nlobfd9zy6oltw70l9nj8ttdm_banner-home.jpg",
    "badge": "Mix Boutique Hotel 20 Phúc La Hà Đông",
    "area": "Huỳnh Thúc Kháng",
    "name": "Mix Boutique Hotel 20 Phúc La Hà Đông",
    "address": "20 Phố Phúc La, Khu đô thị Xa La, Hà Đông, Hà Nội. Phù hợp khách khu Hà Đông - Xa La.",
    "notice": "Đặt phòng tại chi nhánh này nếu bạn muốn chọn đúng khu vực, đúng concept và không nhầm sang chi nhánh khác.",
    "tags": [
      "22 phòng",
      "Superior từ 199k",
      "Deluxe từ 300k",
      "VIP từ 400k"
    ],
    "roomTitle": "Tất cả phòng tại Mix Boutique Hotel 20 Phúc La Hà Đông",
    "rooms": [
      {
        "name": "Room 201 - Naive",
        "link": "/khach-san-tinh-yeu/naive/",
        "price": "Giá từ: 300.000 VND/2h",
        "desc": "Những chú nai nhỏ bé ngơ ngác đang mở to đôi mắt tròn ngây thơ, như mời gọi và chờ đợi những chàng thợ săn thuần thục để được cùng nhau chơi trò TRỐN TÌM giữa con mồi và kẻ săn mồi. Hỡi các anh chàng thợ săn lão luyện, hãy chuẩn bị cho mình một chiến thuật tốt và thi triển kĩ năng vờn mồi đỉnh cao đi nào!",
        "image": "/uploads/images/606eb8a88a15917d2a0cdb34/naive1.webp"
      },
      {
        "name": "VIP 102 - Whisper",
        "link": "/khach-san-tinh-yeu/whisper/",
        "price": "Giá từ: 400.000 VND/2h",
        "desc": "Một lời thì thầm gợi cảm mang theo hơi thở ấm áp nồng nàn kề cận chính là thông điệp yêu thương mạnh mẽ nhất giúp ta chạm tới tất cả những mảnh ghép cảm xúc ở nơi sâu thẳm nhất của người tình. “Whisper” mong muốn sẽ cùng bạn dệt nên những lời tự tình trọn vẹn, lãng mạn và sâu lắng nhất với người mình yêu.",
        "image": "/uploads/images/606eba398a15917d2a0cdb3c/whisper.webp"
      },
      {
        "name": "VIP 101 - Wake up",
        "link": "/khach-san-tinh-yeu/wake-up/",
        "price": "Giá từ: 400.000 VND/2h",
        "desc": "Hãy sẵn sàng để được Wake up đánh thức, vỗ về và mơn trớn mọi giác quan, hãy dìu dắt người tình đi qua những miền cảm xúc chưa từng được khám phá trong một không gian bí ẩn...",
        "image": "/uploads/images/60bc49c18a15913d6bdc812b/wake-up.webp"
      },
      {
        "name": "VIP 202 - Rhett Butler",
        "link": "/khach-san-tinh-yeu/rhett-butler/",
        "price": "Giá từ: 400.000 VND/2h",
        "desc": "Rhett Butler - 1 thực thể lãng mạn, giao thoa hòa trộn giữa bóng tối và ánh sáng, hoài niệm và mới mẻ, dịu dàng da diết và mãnh liệt đắm say",
        "image": "/uploads/images/60bc57e78a15913d6bdc8195/rhett-butler.webp"
      },
      {
        "name": "Room 203 - Confession",
        "link": "/khach-san-tinh-yeu/confession/",
        "price": "Giá từ: 300.000 VND/2h",
        "desc": "Những lời thú tội đôi khi không dễ để diễn đạt bằng lời phải không nào? vậy thì Căn phòng Thú tội tại Mix đã sẵn sàng các để các bad boy dùng hành động chịu phạt thay cho lời thú tội rồi đây! Các chàng trai đã sẵn sàng đón nhận sự trừng phạt ngọt ngào của các cô nàng Gud Girl hay chưa?",
        "image": "/uploads/images/60bc5b128a15913d6bdc81c0/confession.webp"
      },
      {
        "name": "Room 204 - Hollywood",
        "link": "/khach-san-tinh-yeu/hollywood/",
        "price": "Giá từ: 300.000 VND/2h",
        "desc": "Em có một ước mơ về nước Mỹ - buổi tối chúng tôi sẽ lái xe đến rạp chiếu phim ngoài trời, em vừa có thể xem một bộ phim tình cảm lãng mạn vừa có thể ngắm những ánh sao đêm! Và tôi vừa đưa em đến Hollywood để thực hiện giấc mơ xem phim màn ảnh siêu rộng dưới bầu trời đầy sao…",
        "image": "/uploads/images/60bc5ce38a15913d6bdc81e1/holywood.webp"
      },
      {
        "name": "Room 301 - Honeymoon",
        "link": "/khach-san-tinh-yeu/honeymoon/",
        "price": "Giá từ: 300.000 VND/2h",
        "desc": "Trong dòng chảy vội vã của thời gian, không ai biết tương lai sẽ ra sao, nhưng em biết chắc chắn rằng những kỷ niệm đẹp đẽ và rung cảm của chúng ta dành cho nhau sẽ chẳng có gì xóa nhòa được. Em muốn ngày ngày cùng nhau đến Honeymoon, để mỗi lúc bên nhau sẽ được nếm trải những phút giây ngọt ngào nhất và dòng kí ức của chúng ta về nhau luôn là những tháng ngày trăng mật bất tận…",
        "image": "/uploads/images/60bc5f2d8a15913d6bdc81fe/honeymoon.webp"
      },
      {
        "name": "VIP 302 - The Lust",
        "link": "/khach-san-tinh-yeu/the-lust/",
        "price": "Giá từ: 400.000 VND/2h",
        "desc": "Tôi đang ở trạng thái Lust in Love với em. Mọi thứ về em đều hoàn hảo và thu hút tôi, khuôn mặt em, làn môi mềm ấm nóng của em và cả cơ thể hoàn mỹ của em nữa luôn châm ngòi kích hoạt ham muốn và thèm khát yêu thương của tôi dành cho em. Không biết phải nói và làm những gì để em hiểu được những cảm giác tuyệt vời mà tôi luôn cảm thấy mỗi khi được gần gũi em, và vì thế tôi tìm đến The Lust!",
        "image": "/uploads/images/60bc60638a15913d6bdc8216/the-lust.webp"
      },
      {
        "name": "Room 303 - Flame",
        "link": "/khach-san-tinh-yeu/flame/",
        "price": "Giá từ: 300.000 VND/2h",
        "desc": "Một lần thôi, xin em hãy để tâm hồn lạc lối, buông mình vào màn đêm sâu thẳm để cảm nhận hơi ấm chảy giữa đôi làn môi của anh đang mơn man châm lửa, hực hờ hoang hoải dần thiêu đốt da thịt em và chỉ thêm một cái chạm nhẹ của đôi bàn tay anh nóng bỏng, em sẽ lập tức biến thành hàng ngàn tia lửa nhảy múa trong đêm. Hãy để bóng tối nơi căn phòng rực lửa dẫn đường biến chúng ta trở thành ánh sáng, hãy đốt cháy nhau và cùng tan chảy trong một đêm dài triền miên…",
        "image": "/uploads/images/60bc61c48a15913d6bdc8229/Flame.webp"
      },
      {
        "name": "Room 304 - Passion",
        "link": "/khach-san-tinh-yeu/passion/",
        "price": "Giá từ: 300.000 VND/2h",
        "desc": "Passion - Một câu chuyện tình không thể được coi là đẹp nếu thiếu đi sự đam mê cuồng nhiệt của những phút yêu đầu. Đam mê khiến ta thèm được uống từng ánh mắt, đôi môi, giọng nói và thậm chí là thèm được lấp đầy nỗi nhớ bằng mùi hương da thịt của nhau, làm ta cảm thấy chỉ cần được ở gần bên nhau thôi đã là điều tuyệt vời hơn sống trong bất kì một giấc mơ đẹp đẽ nào. Passion - một không gian quá đỗi mê hoặc để những người đang yêu tìm kiếm và trao cho nhau những cảm xúc yêu nồng nàn, mãnh liệt nhất.",
        "image": "/uploads/images/60bc62f18a15913d6bdc823d/Passion.webp"
      },
      {
        "name": "VIP 469 - Get High",
        "link": "/khach-san-tinh-yeu/get-high/",
        "price": "Giá từ: 400.000 VND/2h",
        "desc": "Get High – một không gian lãng mạn và ấm áp, khiến nàng luôn ở trạng thái phấn khích và hưng phấn mỗi lần đặt chân tới có giúp cho chàng dễ dàng chinh phục cảm xúc yêu của nàng hơn? Get High không chỉ giúp các cặp đôi chạm tới được nốt cao nhất trong hành trình kiếm tìm những cung bậc thăng hoa cảm xúc, mà còn giữ cho những rung động mãnh liệt nhất luôn bay bổng, như đang mơ, như đang say…",
        "image": "/uploads/images/60bc667a8a15913d6bdc8263/Get-High.webp"
      }
    ]
  }
];

export const FORM_ROOMS_BY_BRANCH: Record<string, FormRoomOption[]> = {
  "All": [
    {
      "value": "Room 202 - MIA CHERRY",
      "text": "Room 202 - MIA CHERRY",
      "price1": "300000.0",
      "price2": "600000.0",
      "price3": "800.000VND",
      "pricesub": "(thêm 50k/h)"
    },
    {
      "value": "VIP 301 - Scarlet",
      "text": "VIP 301 - Scarlet",
      "price1": "400000.0",
      "price2": "800000.0",
      "price3": "1.000.000VND",
      "pricesub": "(thêm 80k/h)"
    },
    {
      "value": "Room 102 - Cinematic",
      "text": "Room 102 - Cinematic",
      "price1": "300000.0",
      "price2": "600000.0",
      "price3": "600.000VND",
      "pricesub": "(thêm 50k/h)"
    },
    {
      "value": "Room 201 - Tropical Love",
      "text": "Room 201 - Tropical Love",
      "price1": "300000.0",
      "price2": "600000.0",
      "price3": "800.000VND",
      "pricesub": "(thêm 50k/h)"
    },
    {
      "value": " Room 00 - Hidden Frenzy ",
      "text": "Room 00 - Hidden Frenzy",
      "price1": "300000.0",
      "price2": "600000.0",
      "price3": "800.000VND",
      "pricesub": "(thêm 50k/h)"
    },
    {
      "value": "VIP 01 - Oasis",
      "text": "VIP 01 - Oasis",
      "price1": "400000.0",
      "price2": "800000.0",
      "price3": "1.000.000VND",
      "pricesub": "(thêm 80k/h)"
    },
    {
      "value": "Room 02 - Bad Boy",
      "text": "Room 02 - Bad Boy",
      "price1": "300000.0",
      "price2": "600000.0",
      "price3": "800.000VND",
      "pricesub": "(thêm 50k/h)"
    },
    {
      "value": "VIP 202 - Renai ",
      "text": "VIP 202 - Renai",
      "price1": "380000.0",
      "price2": "750000.0",
      "price3": "850.000VND",
      "pricesub": "(thêm 70k/h)"
    },
    {
      "value": "Room 301 - Aurora",
      "text": "Room 301 - Aurora",
      "price1": "300000.0",
      "price2": "600000.0",
      "price3": "800.000VND",
      "pricesub": "(thêm 50k/h)"
    },
    {
      "value": "Room 302 - Virgin ",
      "text": "Room 302 - Virgin",
      "price1": "300000.0",
      "price2": "600000.0",
      "price3": "800.000VND",
      "pricesub": "(thêm 50k/h)"
    },
    {
      "value": "Room 302 - Lullaby",
      "text": "Room 302 - Lullaby",
      "price1": "300000.0",
      "price2": "600000.0",
      "price3": "800.000VND",
      "pricesub": "(thêm 50k/h)"
    },
    {
      "value": "VIP 401 - Hội An",
      "text": "VIP 401 - Hội An",
      "price1": "400000.0",
      "price2": "800000.0",
      "price3": "1.000.000VND",
      "pricesub": "(thêm 80k/h)"
    },
    {
      "value": "Room 402 - Fire",
      "text": "Room 402 - Fire",
      "price1": "300000.0",
      "price2": "600000.0",
      "price3": "800.000VND",
      "pricesub": "(thêm 50k/h)"
    },
    {
      "value": "VIP 501 - Casanova",
      "text": "VIP 501 - Casanova",
      "price1": "400000.0",
      "price2": "800000.0",
      "price3": "1.000.000VND",
      "pricesub": "(thêm 80k/h)"
    },
    {
      "value": "Room 502 - Pure",
      "text": "Room 502 - Pure",
      "price1": "300000.0",
      "price2": "600000.0",
      "price3": "800.000VND",
      "pricesub": "(thêm 50k/h)"
    },
    {
      "value": "Room 601 - Wild n Free",
      "text": "Room 601 - Wild n Free",
      "price1": "300000.0",
      "price2": "600000.0",
      "price3": "800.000VND",
      "pricesub": "(thêm 50k/h)"
    },
    {
      "value": "Room 602 - So Close",
      "text": "Room 602 - So Close",
      "price1": "300000.0",
      "price2": "600000.0",
      "price3": "800.000VND",
      "pricesub": "(thêm 50k/h)"
    },
    {
      "value": "VIP 03 - Lover",
      "text": "VIP 03 - Lover",
      "price1": "400000.0",
      "price2": "800000.0",
      "price3": "1.000.000VND",
      "pricesub": "(thêm 80k/h)"
    },
    {
      "value": "Room 04 - After Sunset",
      "text": "Room 04 - After Sunset",
      "price1": "300000.0",
      "price2": "600000.0",
      "price3": "800.000VND",
      "pricesub": "(thêm 50k/h)"
    },
    {
      "value": "VIP 05 - Kissing",
      "text": "VIP 05 - Kissing",
      "price1": "400000.0",
      "price2": "800000.0",
      "price3": "1.000.000VND",
      "pricesub": "(thêm 80k/h)"
    },
    {
      "value": "Room 06 - Lollipop",
      "text": "Room 06 - Lollipop",
      "price1": "300000.0",
      "price2": "600000.0",
      "price3": "800.000VND",
      "pricesub": "(thêm 50k/h)"
    },
    {
      "value": "VIP 07 - On Top",
      "text": "VIP 07 - On Top",
      "price1": "400000.0",
      "price2": "800000.0",
      "price3": "1.000.000VND",
      "pricesub": "(thêm 80k/h)"
    },
    {
      "value": "Room 08 - Blowj Up",
      "text": "Room 08 - Blowj Up",
      "price1": "300000.0",
      "price2": "600000.0",
      "price3": "800.000VND",
      "pricesub": "(thêm 50k/h)"
    },
    {
      "value": "Room 09 - Lalaland",
      "text": "Room 09 - Lalaland",
      "price1": "300000.0",
      "price2": "600000.0",
      "price3": "800.000VND",
      "pricesub": "(thêm 50k/h)"
    },
    {
      "value": "Room 401 - Kama",
      "text": "Room 401 - Kama",
      "price1": "300000.0",
      "price2": "600000.0",
      "price3": "800.000VND",
      "pricesub": "(thêm 50k/h)"
    },
    {
      "value": "Room 402 - Lalendi ",
      "text": "Room 402 - Lalendi",
      "price1": "300000.0",
      "price2": "600000.0",
      "price3": "800.000VND",
      "pricesub": "(thêm 50k/h)"
    },
    {
      "value": "CINE 501 - Wonderland ",
      "text": "CINE 501 - Wonderland",
      "price1": "380000.0",
      "price2": "750000.0",
      "price3": "850.000VND",
      "pricesub": "(thêm 70k/h)"
    },
    {
      "value": "CINE 502 - Gypsy",
      "text": "CINE 502 - Gypsy",
      "price1": "380000.0",
      "price2": "750000.0",
      "price3": "850.000VND",
      "pricesub": "(thêm 70k/h)"
    },
    {
      "value": "SUITE 601 - Poppy ",
      "text": "SUITE 601 - Poppy",
      "price1": "450000.0",
      "price2": "850000.0",
      "price3": "950.000VND",
      "pricesub": "(thêm 80k/h)"
    },
    {
      "value": "SUITE 701 - X.O.X.O",
      "text": "SUITE 701 - X.O.X.O",
      "price1": "450000.0",
      "price2": "850000.0",
      "price3": "950.000VND",
      "pricesub": "(thêm 80k/h)"
    },
    {
      "value": "Room 201 - Naive",
      "text": "Room 201 - Naive",
      "price1": "300000.0",
      "price2": "600000.0",
      "price3": "800.000VND",
      "pricesub": "(thêm 50k/h)"
    },
    {
      "value": "VIP 102 - Whisper",
      "text": "VIP 102 - Whisper",
      "price1": "400000.0",
      "price2": "800000.0",
      "price3": "1.000.000VND",
      "pricesub": "(thêm 80k/h)"
    },
    {
      "value": "VIP 101 - Wake up",
      "text": "VIP 101 - Wake up",
      "price1": "400000.0",
      "price2": "800000.0",
      "price3": "1.000.000VND",
      "pricesub": "(thêm 80k/h)"
    },
    {
      "value": "VIP 202 - Rhett Butler",
      "text": "VIP 202 - Rhett Butler",
      "price1": "400000.0",
      "price2": "800000.0",
      "price3": "1.000.000VND",
      "pricesub": "(thêm 80k/h)"
    },
    {
      "value": "Room 203 - Confession",
      "text": "Room 203 - Confession",
      "price1": "300000.0",
      "price2": "600000.0",
      "price3": "800.000VND",
      "pricesub": "(thêm 50k/h)"
    },
    {
      "value": "Room 204 - Hollywood",
      "text": "Room 204 - Hollywood",
      "price1": "300000.0",
      "price2": "600000.0",
      "price3": "800.000VND",
      "pricesub": "(thêm 50k/h)"
    },
    {
      "value": "Room 301 - Honeymoon",
      "text": "Room 301 - Honeymoon",
      "price1": "300000.0",
      "price2": "600000.0",
      "price3": "800.000VND",
      "pricesub": "(thêm 50k/h)"
    },
    {
      "value": "VIP 302 - The Lust",
      "text": "VIP 302 - The Lust",
      "price1": "400000.0",
      "price2": "800000.0",
      "price3": "1.000.000VND",
      "pricesub": "(thêm 80k/h)"
    },
    {
      "value": "Room 303 - Flame",
      "text": "Room 303 - Flame",
      "price1": "300000.0",
      "price2": "600000.0",
      "price3": "800.000VND",
      "pricesub": "(thêm 50k/h)"
    },
    {
      "value": "Room 304 - Passion",
      "text": "Room 304 - Passion",
      "price1": "300000.0",
      "price2": "600000.0",
      "price3": "800.000VND",
      "pricesub": "(thêm 50k/h)"
    },
    {
      "value": "VIP 469 - Get High",
      "text": "VIP 469 - Get High",
      "price1": "400000.0",
      "price2": "800000.0",
      "price3": "1.000.000VND",
      "pricesub": "(thêm 80k/h)"
    },
    {
      "value": "Room 001 - Bad girl",
      "text": "Room 001 - Bad girl",
      "price1": "300000.0",
      "price2": "600000.0",
      "price3": "800.000 VND",
      "pricesub": "(thêm 50k/h)"
    },
    {
      "value": "VIP Room 102 - Inferno",
      "text": "VIP Room 102 - Inferno",
      "price1": "400000.0",
      "price2": "800000.0",
      "price3": "1.000.000 VND",
      "pricesub": "(thêm 80k/h)"
    },
    {
      "value": "Room 201 - Master n Slave",
      "text": "Room 201 - Master n Slave",
      "price1": "300000.0",
      "price2": "600000.0",
      "price3": "800.000 VND",
      "pricesub": "(thêm 50k/h)"
    },
    {
      "value": "Room 202 - Galaxy",
      "text": "Room 202 - Galaxy",
      "price1": "199000.0",
      "price2": "500000.0",
      "price3": "700.000 VND",
      "pricesub": "(thêm 50k/h)"
    },
    {
      "value": "VIP Room 203 - Eden",
      "text": "VIP Room 203 - Eden",
      "price1": "400000.0",
      "price2": "800000.0",
      "price3": "1.000.000 VND",
      "pricesub": "(thêm 80k/h)"
    },
    {
      "value": "Room 301 - Lolita",
      "text": "Room 301 - Lolita",
      "price1": "300000.0",
      "price2": "600000.0",
      "price3": "800.000 VND",
      "pricesub": "(thêm 50k/h)"
    },
    {
      "value": "Room 302 - Karma",
      "text": "Room 302 - Karma",
      "price1": "199000.0",
      "price2": "500000.0",
      "price3": "800.000 VND",
      "pricesub": "(thêm 50k/h)"
    },
    {
      "value": "VIP Room 303 - Scarlet",
      "text": "VIP Room 303 - Scarlet",
      "price1": "400000.0",
      "price2": "800000.0",
      "price3": "1.000.000 VND",
      "pricesub": "(thêm 80k/h)"
    },
    {
      "value": "VIP Room 401 - Katana",
      "text": "VIP Room 401 - Katana",
      "price1": "400000.0",
      "price2": "800000.0",
      "price3": "1.000.000 VND",
      "pricesub": "(thêm 80k/h)"
    },
    {
      "value": "Room 402 - Amora",
      "text": "Room 402 - Amora",
      "price1": "300000.0",
      "price2": "600000.0",
      "price3": "800.000 VND",
      "pricesub": "(thêm 50k/h)"
    },
    {
      "value": "VIP Room 469 - Cloud Nine",
      "text": "VIP Room 469 - Cloud Nine",
      "price1": "400000.0",
      "price2": "800000.0",
      "price3": "1.000.000 VND",
      "pricesub": "(thêm 80k/h)"
    }
  ],
  "Mix Boutique Premium": [
    {
      "value": "Room 202 - MIA CHERRY",
      "text": "Room 202 - MIA CHERRY",
      "price1": "300000.0",
      "price2": "600000.0",
      "price3": "800.000VND",
      "pricesub": "(thêm 50k/h)"
    },
    {
      "value": "VIP 301 - Scarlet",
      "text": "VIP 301 - Scarlet",
      "price1": "400000.0",
      "price2": "800000.0",
      "price3": "1.000.000VND",
      "pricesub": "(thêm 80k/h)"
    },
    {
      "value": "Room 102 - Cinematic",
      "text": "Room 102 - Cinematic",
      "price1": "300000.0",
      "price2": "600000.0",
      "price3": "600.000VND",
      "pricesub": "(thêm 50k/h)"
    },
    {
      "value": "Room 201 - Tropical Love",
      "text": "Room 201 - Tropical Love",
      "price1": "300000.0",
      "price2": "600000.0",
      "price3": "800.000VND",
      "pricesub": "(thêm 50k/h)"
    },
    {
      "value": "Room 302 - Lullaby",
      "text": "Room 302 - Lullaby",
      "price1": "300000.0",
      "price2": "600000.0",
      "price3": "800.000VND",
      "pricesub": "(thêm 50k/h)"
    },
    {
      "value": "VIP 401 - Hội An",
      "text": "VIP 401 - Hội An",
      "price1": "400000.0",
      "price2": "800000.0",
      "price3": "1.000.000VND",
      "pricesub": "(thêm 80k/h)"
    },
    {
      "value": "Room 402 - Fire",
      "text": "Room 402 - Fire",
      "price1": "300000.0",
      "price2": "600000.0",
      "price3": "800.000VND",
      "pricesub": "(thêm 50k/h)"
    },
    {
      "value": "VIP 501 - Casanova",
      "text": "VIP 501 - Casanova",
      "price1": "400000.0",
      "price2": "800000.0",
      "price3": "1.000.000VND",
      "pricesub": "(thêm 80k/h)"
    },
    {
      "value": "Room 502 - Pure",
      "text": "Room 502 - Pure",
      "price1": "300000.0",
      "price2": "600000.0",
      "price3": "800.000VND",
      "pricesub": "(thêm 50k/h)"
    },
    {
      "value": "Room 601 - Wild n Free",
      "text": "Room 601 - Wild n Free",
      "price1": "300000.0",
      "price2": "600000.0",
      "price3": "800.000VND",
      "pricesub": "(thêm 50k/h)"
    },
    {
      "value": "Room 602 - So Close",
      "text": "Room 602 - So Close",
      "price1": "300000.0",
      "price2": "600000.0",
      "price3": "800.000VND",
      "pricesub": "(thêm 50k/h)"
    },
    {
      "value": "Room 001 - Bad girl",
      "text": "Room 001 - Bad girl",
      "price1": "300000.0",
      "price2": "600000.0",
      "price3": "800.000 VND",
      "pricesub": "(thêm 50k/h)"
    },
    {
      "value": "VIP Room 102 - Inferno",
      "text": "VIP Room 102 - Inferno",
      "price1": "400000.0",
      "price2": "800000.0",
      "price3": "1.000.000 VND",
      "pricesub": "(thêm 80k/h)"
    },
    {
      "value": "Room 201 - Master n Slave",
      "text": "Room 201 - Master n Slave",
      "price1": "300000.0",
      "price2": "600000.0",
      "price3": "800.000 VND",
      "pricesub": "(thêm 50k/h)"
    },
    {
      "value": "Room 202 - Galaxy",
      "text": "Room 202 - Galaxy",
      "price1": "199000.0",
      "price2": "500000.0",
      "price3": "700.000 VND",
      "pricesub": "(thêm 50k/h)"
    },
    {
      "value": "VIP Room 203 - Eden",
      "text": "VIP Room 203 - Eden",
      "price1": "400000.0",
      "price2": "800000.0",
      "price3": "1.000.000 VND",
      "pricesub": "(thêm 80k/h)"
    },
    {
      "value": "Room 301 - Lolita",
      "text": "Room 301 - Lolita",
      "price1": "300000.0",
      "price2": "600000.0",
      "price3": "800.000 VND",
      "pricesub": "(thêm 50k/h)"
    },
    {
      "value": "Room 302 - Karma",
      "text": "Room 302 - Karma",
      "price1": "199000.0",
      "price2": "500000.0",
      "price3": "800.000 VND",
      "pricesub": "(thêm 50k/h)"
    },
    {
      "value": "VIP Room 303 - Scarlet",
      "text": "VIP Room 303 - Scarlet",
      "price1": "400000.0",
      "price2": "800000.0",
      "price3": "1.000.000 VND",
      "pricesub": "(thêm 80k/h)"
    },
    {
      "value": "VIP Room 401 - Katana",
      "text": "VIP Room 401 - Katana",
      "price1": "400000.0",
      "price2": "800000.0",
      "price3": "1.000.000 VND",
      "pricesub": "(thêm 80k/h)"
    },
    {
      "value": "Room 402 - Amora",
      "text": "Room 402 - Amora",
      "price1": "300000.0",
      "price2": "600000.0",
      "price3": "800.000 VND",
      "pricesub": "(thêm 50k/h)"
    },
    {
      "value": "VIP Room 469 - Cloud Nine",
      "text": "VIP Room 469 - Cloud Nine",
      "price1": "400000.0",
      "price2": "800000.0",
      "price3": "1.000.000 VND",
      "pricesub": "(thêm 80k/h)"
    }
  ],
  "Mix Boutique Hotel 256B Đặng Tiến Đông ": [
    {
      "value": " Room 00 - Hidden Frenzy ",
      "text": "Room 00 - Hidden Frenzy",
      "price1": "300000.0",
      "price2": "600000.0",
      "price3": "800.000VND",
      "pricesub": "(thêm 50k/h)"
    },
    {
      "value": "VIP 01 - Oasis",
      "text": "VIP 01 - Oasis",
      "price1": "400000.0",
      "price2": "800000.0",
      "price3": "1.000.000VND",
      "pricesub": "(thêm 80k/h)"
    },
    {
      "value": "Room 02 - Bad Boy",
      "text": "Room 02 - Bad Boy",
      "price1": "300000.0",
      "price2": "600000.0",
      "price3": "800.000VND",
      "pricesub": "(thêm 50k/h)"
    },
    {
      "value": "VIP 03 - Lover",
      "text": "VIP 03 - Lover",
      "price1": "400000.0",
      "price2": "800000.0",
      "price3": "1.000.000VND",
      "pricesub": "(thêm 80k/h)"
    },
    {
      "value": "Room 04 - After Sunset",
      "text": "Room 04 - After Sunset",
      "price1": "300000.0",
      "price2": "600000.0",
      "price3": "800.000VND",
      "pricesub": "(thêm 50k/h)"
    },
    {
      "value": "VIP 05 - Kissing",
      "text": "VIP 05 - Kissing",
      "price1": "400000.0",
      "price2": "800000.0",
      "price3": "1.000.000VND",
      "pricesub": "(thêm 80k/h)"
    },
    {
      "value": "Room 06 - Lollipop",
      "text": "Room 06 - Lollipop",
      "price1": "300000.0",
      "price2": "600000.0",
      "price3": "800.000VND",
      "pricesub": "(thêm 50k/h)"
    },
    {
      "value": "VIP 07 - On Top",
      "text": "VIP 07 - On Top",
      "price1": "400000.0",
      "price2": "800000.0",
      "price3": "1.000.000VND",
      "pricesub": "(thêm 80k/h)"
    },
    {
      "value": "Room 08 - Blowj Up",
      "text": "Room 08 - Blowj Up",
      "price1": "300000.0",
      "price2": "600000.0",
      "price3": "800.000VND",
      "pricesub": "(thêm 50k/h)"
    },
    {
      "value": "Room 09 - Lalaland",
      "text": "Room 09 - Lalaland",
      "price1": "300000.0",
      "price2": "600000.0",
      "price3": "800.000VND",
      "pricesub": "(thêm 50k/h)"
    }
  ],
  "Mix Boutique Hotel 20 Phúc La Hà Đông ": [
    {
      "value": "Room 201 - Naive",
      "text": "Room 201 - Naive",
      "price1": "300000.0",
      "price2": "600000.0",
      "price3": "800.000VND",
      "pricesub": "(thêm 50k/h)"
    },
    {
      "value": "VIP 102 - Whisper",
      "text": "VIP 102 - Whisper",
      "price1": "400000.0",
      "price2": "800000.0",
      "price3": "1.000.000VND",
      "pricesub": "(thêm 80k/h)"
    },
    {
      "value": "VIP 101 - Wake up",
      "text": "VIP 101 - Wake up",
      "price1": "400000.0",
      "price2": "800000.0",
      "price3": "1.000.000VND",
      "pricesub": "(thêm 80k/h)"
    },
    {
      "value": "VIP 202 - Rhett Butler",
      "text": "VIP 202 - Rhett Butler",
      "price1": "400000.0",
      "price2": "800000.0",
      "price3": "1.000.000VND",
      "pricesub": "(thêm 80k/h)"
    },
    {
      "value": "Room 203 - Confession",
      "text": "Room 203 - Confession",
      "price1": "300000.0",
      "price2": "600000.0",
      "price3": "800.000VND",
      "pricesub": "(thêm 50k/h)"
    },
    {
      "value": "Room 204 - Hollywood",
      "text": "Room 204 - Hollywood",
      "price1": "300000.0",
      "price2": "600000.0",
      "price3": "800.000VND",
      "pricesub": "(thêm 50k/h)"
    },
    {
      "value": "Room 301 - Honeymoon",
      "text": "Room 301 - Honeymoon",
      "price1": "300000.0",
      "price2": "600000.0",
      "price3": "800.000VND",
      "pricesub": "(thêm 50k/h)"
    },
    {
      "value": "VIP 302 - The Lust",
      "text": "VIP 302 - The Lust",
      "price1": "400000.0",
      "price2": "800000.0",
      "price3": "1.000.000VND",
      "pricesub": "(thêm 80k/h)"
    },
    {
      "value": "Room 303 - Flame",
      "text": "Room 303 - Flame",
      "price1": "300000.0",
      "price2": "600000.0",
      "price3": "800.000VND",
      "pricesub": "(thêm 50k/h)"
    },
    {
      "value": "Room 304 - Passion",
      "text": "Room 304 - Passion",
      "price1": "300000.0",
      "price2": "600000.0",
      "price3": "800.000VND",
      "pricesub": "(thêm 50k/h)"
    },
    {
      "value": "VIP 469 - Get High",
      "text": "VIP 469 - Get High",
      "price1": "400000.0",
      "price2": "800000.0",
      "price3": "1.000.000VND",
      "pricesub": "(thêm 80k/h)"
    }
  ]
};
