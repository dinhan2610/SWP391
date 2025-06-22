import React, { useState } from "react";
import "./index.css"; // Import CSS từ file index.css
import { Modal, Button } from "react-bootstrap";

export default function BlogPages() {
  // eslint-disable-next-line no-unused-vars
  const [activePost, setActivePost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPost, setModalPost] = useState(null);

  const posts = [
    {
      id: 1,
      title: "Giáo Dục Giới Tính Cho Thanh Thiếu Niên",
      excerpt:
        "Giáo dục giới tính giúp thanh thiếu niên hiểu biết về cơ thể và sức khỏe của mình.",
      fullText:
        "Giáo dục giới tính đóng vai trò quan trọng trong việc giúp thanh thiếu niên hiểu biết về cơ thể và sức khỏe của mình. Nó cung cấp những kiến thức cần thiết về sự phát triển của cơ thể, sự đồng ý trong quan hệ tình dục, và sức khỏe sinh sản, từ đó giúp các em đưa ra những quyết định đúng đắn. Việc hiểu biết về sự thay đổi của cơ thể, như sự phát triển của cơ quan sinh dục, sự thay đổi về cảm xúc, và chu kỳ kinh nguyệt, sẽ giúp các em chấp nhận những thay đổi này một cách tự nhiên hơn.\n\n" +
        "Giáo dục giới tính cũng dạy về tầm quan trọng của sự đồng ý trong việc xây dựng các mối quan hệ lành mạnh. Nó giúp thanh thiếu niên nhận thức được quyền lợi và trách nhiệm của mình, từ đó thúc đẩy sự tôn trọng lẫn nhau và ngăn ngừa bạo lực tình dục. Bên cạnh đó, nó còn cung cấp kiến thức về sức khỏe sinh sản, bao gồm cách bảo vệ bản thân khỏi các bệnh lây truyền qua đường tình dục (STIs) và mang thai ngoài ý muốn, cũng như cách giảm thiểu rủi ro thông qua các biện pháp an toàn.\n\n" +
        "Bằng cách tìm hiểu về sức khỏe sinh sản, thanh thiếu niên cũng phát triển được khả năng nhận thức về ranh giới cá nhân, điều này rất quan trọng để duy trì các mối quan hệ lành mạnh. Giáo dục giới tính khuyến khích việc trò chuyện cởi mở về các mối quan hệ, giúp xóa bỏ các định kiến và thúc đẩy những thái độ tích cực hơn về tình dục. Trong một thế giới ngày càng phức tạp, việc trang bị cho thanh thiếu niên những kiến thức cần thiết sẽ giúp các em có thể đưa ra những lựa chọn sáng suốt và có trách nhiệm trong cuộc sống của mình.\n\n" +
        "Cuối cùng, giáo dục giới tính giúp thanh thiếu niên có thể đưa ra những lựa chọn có trách nhiệm, hình thành những thói quen và mối quan hệ lành mạnh, từ đó nâng cao sức khỏe và hạnh phúc của bản thân. Nó rất cần thiết cho sự phát triển về thể chất, tinh thần và xã hội của các em, dẫn đến một cuộc sống khỏe mạnh và có trách nhiệm hơn.",
      date: "12/06/2025",
      image: "/blog/01.png", // Hình ảnh chỉ xuất hiện trong phần này
    },
    {
      id: 2,
      title: "Chăm Sóc Sức Khỏe Sinh Sản Cho Phụ Nữ",
      excerpt:
        "Khám phá các phương pháp chăm sóc sức khỏe sinh sản cho phụ nữ ở các độ tuổi khác nhau.",
      fullText:
        "Chăm sóc sức khỏe sinh sản là điều cần thiết cho phụ nữ ở mọi lứa tuổi. Nó bao gồm nhiều phương pháp và thực hành khác nhau để đảm bảo sức khỏe và sự phát triển của hệ thống sinh sản nữ. Từ tuổi dậy thì đến thời kỳ mãn kinh, phụ nữ cần hiểu biết về khả năng sinh sản, các biện pháp tránh thai, và tầm quan trọng của việc khám phụ khoa định kỳ. Khi phụ nữ lớn tuổi, nhu cầu về sức khỏe sinh sản của họ cũng thay đổi, và việc cập nhật thông tin về những thay đổi này là chìa khóa để duy trì sức khỏe tốt.\n\n" +
        "Trong những năm sinh sản, việc theo dõi sức khỏe kinh nguyệt và tìm kiếm sự tư vấn chuyên môn nếu có bất kỳ bất thường nào xảy ra là rất quan trọng. Các biện pháp tránh thai như thuốc tránh thai, vòng tránh thai (IUD), que cấy, và bao cao su, giúp phụ nữ có khả năng kiểm soát sức khỏe sinh sản của mình. Việc khám sức khỏe định kỳ và sàng lọc, bao gồm xét nghiệm Pap và chụp X-quang vú, rất cần thiết để phát hiện sớm các vấn đề sức khỏe tiềm ẩn. Khi phụ nữ tiến gần đến thời kỳ mãn kinh, họ nên nhận thức được những thay đổi ảnh hưởng đến cơ thể và tìm kiếm lời khuyên về cách quản lý các triệu chứng và ngăn ngừa các rủi ro sức khỏe tiềm ẩn.\n\n" +
        "Bằng cách duy trì một lối sống lành mạnh, như dinh dưỡng hợp lý, tập thể dục thường xuyên, và quản lý căng thẳng, phụ nữ có thể cải thiện sức khỏe sinh sản và tổng thể của mình. Việc thăm khám định kỳ với các nhà cung cấp dịch vụ y tế đảm bảo rằng phụ nữ có quyền truy cập vào các nguồn lực và hỗ trợ cần thiết, dẫn đến kết quả sức khỏe tốt hơn trong suốt cuộc đời.",
      date: "05/06/2025",
      image: "/blog/02.png",
    },
    {
      id: 3,
      title: "Xét Nghiệm Và Phòng Ngừa Bệnh Lây Qua Đường Tình Dục",
      excerpt:
        "Tìm hiểu về các phương pháp xét nghiệm STI và cách phòng ngừa chúng hiệu quả.",
      fullText:
        "Các bệnh lây truyền qua đường tình dục (STIs) là một mối quan tâm sức khỏe nghiêm trọng trên toàn thế giới, nhưng nhiều bệnh trong số đó có thể phòng ngừa và điều trị được nếu phát hiện sớm. Xét nghiệm STI là rất quan trọng để duy trì sức khỏe tình dục và ngăn ngừa sự lây lan của nhiễm trùng. Bài viết này đề cập đến các phương pháp xét nghiệm khác nhau, bao gồm xét nghiệm máu, xét nghiệm nước tiểu, và lấy mẫu dịch, và giải thích cách mà những xét nghiệm này có thể phát hiện nhiễm trùng ngay cả trong giai đoạn đầu.",
      date: "01/06/2025",
      image: "/blog/03.png",
    },
    {
      id: 4,
      title: "Hiểu Về Rụng Trứng Và Khả Năng Sinh Sản",
      excerpt:
        "Giới thiệu về quá trình rụng trứng và mối quan hệ của nó với khả năng sinh sản và thụ thai.",
      fullText:
        "Hiểu về rụng trứng và khả năng sinh sản là điều cần thiết cho bất kỳ ai đang cố gắng thụ thai hoặc tránh thai. Rụng trứng là quá trình mà trứng được giải phóng từ buồng trứng, và biết được thời điểm này xảy ra có thể giúp các cặp đôi lên kế hoạch cho việc thụ thai hoặc sử dụng các phương pháp nhận thức về khả năng sinh sản để tránh thai. Bài viết này giải thích về khoa học của quá trình rụng trứng và mối liên hệ của nó với khả năng sinh sản.\n\n" +
        "Theo dõi quá trình rụng trứng là một cách hiệu quả để dự đoán thời điểm dễ thụ thai. Bằng cách hiểu các thay đổi trong dịch âm đạo, nhiệt độ cơ thể cơ bản, và sử dụng các bộ dụng cụ dự đoán rụng trứng, các cặp đôi có thể hiểu rõ hơn về chu kỳ của mình và tăng cường khả năng thụ thai. Đối với những người đang cố gắng tránh thai, kiến thức này cũng cung cấp một phương pháp lập kế hoạch gia đình tự nhiên. Tuy nhiên, cần nhận thức rằng quá trình rụng trứng không phải lúc nào cũng có thể dự đoán được, và các yếu tố như căng thẳng, bệnh tật, và mất cân bằng hormone có thể ảnh hưởng đến chu kỳ.\n\n" +
        "Ngoài ra, còn có những yếu tố về lối sống có thể ảnh hưởng đến khả năng sinh sản, chẳng hạn như duy trì cân nặng hợp lý, ăn uống cân bằng, giảm căng thẳng, và tránh xa thuốc lá hoặc rượu bia. Các cặp đôi gặp khó khăn trong việc sinh sản nên tham khảo ý kiến của các chuyên gia y tế để được tư vấn và khám phá các lựa chọn như điều trị vô sinh hoặc công nghệ hỗ trợ sinh sản.",
      date: "20/05/2025",
      image: "/blog/04.png",
    },
    {
      id: 5,
      title: "Giải Thích Về Các Phương Pháp Tránh Thai",
      excerpt:
        "Hướng dẫn về các phương pháp tránh thai khác nhau dành cho phụ nữ.",
      fullText:
        "Lựa chọn phương pháp tránh thai phù hợp là một quyết định cá nhân phụ thuộc vào sức khỏe, lối sống, và mục tiêu sinh sản của từng người. Bài viết này giải thích về các phương pháp tránh thai phổ biến nhất hiện nay dành cho phụ nữ, bao gồm cả phương pháp hormone và không hormone, và giúp phụ nữ hiểu rõ hơn về các lựa chọn của mình.\n\n" +
        "Các phương pháp hormone, chẳng hạn như thuốc tránh thai, miếng dán, tiêm, và vòng tránh thai (IUD), hoạt động bằng cách điều chỉnh hormone để ngăn ngừa rụng trứng, làm dày dịch cổ tử cung, và làm mỏng niêm mạc tử cung. Mặc dù rất hiệu quả, nhưng những phương pháp này có thể gây ra tác dụng phụ như tăng cân, thay đổi tâm trạng, hoặc thay đổi chu kỳ kinh nguyệt. Các lựa chọn không hormone, bao gồm bao cao su, màng ngăn, và vòng tránh thai bằng đồng, cung cấp sự bảo vệ bằng rào cản và là lựa chọn lý tưởng cho những ai muốn tránh xa hormone.\n\n" +
        "Bài viết này cũng đề cập đến các phương pháp triệt sản vĩnh viễn, là một lựa chọn an toàn và hiệu quả cho những ai không muốn có con trong tương lai. Phụ nữ nên có những cuộc thảo luận cởi mở với các nhà cung cấp dịch vụ y tế của mình để xác định phương pháp tốt nhất dựa trên tiền sử bệnh lý, lối sống, và sở thích của họ. Tránh thai là một công cụ quan trọng cho sức khỏe và sự tự chủ của phụ nữ, giúp họ có khả năng lập kế hoạch cho tương lai sinh sản của mình.",
      date: "15/05/2025",
      image: "/blog/05.png",
    },
    {
      id: 6,
      title: "Nhận Thức Về Sức Khỏe Kinh Nguyệt",
      excerpt:
        "Tìm hiểu về sức khỏe kinh nguyệt và tầm quan trọng của việc kiểm tra sức khỏe định kỳ.",
      fullText:
        "Sức khỏe kinh nguyệt là một khía cạnh quan trọng của sức khỏe tổng thể ở phụ nữ. Hiểu về chu kỳ kinh nguyệt, nhận biết các dấu hiệu bất thường, và biết khi nào cần tìm kiếm sự trợ giúp y tế là những yếu tố then chốt để duy trì sức khỏe tốt. Bài viết này giải thích về cách thức hoạt động của chu kỳ kinh nguyệt và các triệu chứng điển hình mà phụ nữ thường gặp phải trong thời kỳ này.\n\n" +
        "Kinh nguyệt không đều có thể là dấu hiệu của các vấn đề sức khỏe tiềm ẩn, chẳng hạn như hội chứng buồng trứng đa nang (PCOS), rối loạn tuyến giáp, hoặc căng thẳng. Việc kiểm tra sức khỏe định kỳ với bác sĩ phụ khoa có thể giúp phát hiện sớm bất kỳ vấn đề tiềm ẩn nào và đảm bảo rằng phụ nữ nhận được sự chăm sóc và điều trị thích hợp. Ngoài ra, phụ nữ cũng cần quản lý các triệu chứng kinh nguyệt như đau bụng, đầy hơi, và mệt mỏi bằng cách sử dụng các phương pháp giảm đau, tập thể dục, và duy trì chế độ ăn uống lành mạnh.\n\n" +
        "Nhận thức về sức khỏe kinh nguyệt cũng bao gồm việc hiểu về các loại sản phẩm vệ sinh kinh nguyệt khác nhau, chẳng hạn như băng vệ sinh, tampon, cốc nguyệt san, và đồ lót kỳ. Những sản phẩm này cho phép phụ nữ quản lý kỳ kinh nguyệt của mình theo cách phù hợp với lối sống, đảm bảo sự thoải mái và tiện lợi trong suốt thời gian hành kinh.",
      date: "10/05/2025",
      image: "/blog/06.png",
    },
    {
      id: 7,
      title: "Tầm Quan Trọng Của Sự Đồng Ý Trong Tình Dục",
      excerpt:
        "Tại sao việc hiểu và thực hành sự đồng ý trong tình dục là rất quan trọng.",
      fullText:
        "Sự đồng ý trong tình dục là một thành component cơ bản của bất kỳ mối quan hệ tình dục lành mạnh nào. Nó đảm bảo rằng cả hai đối tác đều là những người tham gia tình nguyện và nhiệt tình trong hoạt động tình dục. Bài viết này giải thích sự đồng ý là gì, tại sao nó cần thiết, và làm thế nào để đảm bảo rằng cả hai bên đều cảm thấy thoải mái và tôn trọng ranh giới của nhau.\n\n" +
        "Sự đồng ý không chỉ đơn giản là nói 'có' hoặc 'không', mà còn là việc giao tiếp liên tục trong suốt quá trình quan hệ tình dục. Cần phải hiểu rằng sự đồng ý có thể bị rút lại bất cứ lúc nào, và cả hai bên luôn cảm thấy tự do để bày tỏ cảm xúc và mong muốn của mình một cách cởi mở. Khái niệm này rất quan trọng trong việc thúc đẩy sự tôn trọng, tin tưởng, và sự thỏa mãn lẫn nhau trong các mối quan hệ.\n\n" +
        "Sự đồng ý trong tình dục cũng đóng vai trò quan trọng trong việc ngăn ngừa bạo lực và lạm dụng tình dục. Bằng cách giáo dục mọi người về tầm quan trọng của sự đồng ý, xã hội có thể giảm thiểu tỷ lệ tội phạm tình dục và tạo ra một môi trường an toàn hơn cho mọi người. Hiểu và thực hành sự đồng ý là điều cần thiết để xây dựng những mối quan hệ lành mạnh dựa trên sự tôn trọng và bình đẳng.",
      date: "02/05/2025",
      image: "/blog/07.png",
    },
    {
      id: 8,
      title: "Sức Khỏe Tâm Thần Và Sự Lành Mạnh Tình Dục",
      excerpt: "Tâm lý ảnh hưởng đến sức khỏe tình dục và ngược lại.",
      fullText:
        "Sức khỏe tâm thần và sự lành mạnh tình dục có mối liên hệ chặt chẽ với nhau, và một trong hai yếu tố này có thể ảnh hưởng đáng kể đến yếu tố kia. Lo âu, trầm cảm, và căng thẳng có thể tác động đến ham muốn và khả năng tham gia vào hoạt động tình dục, trong khi sức khỏe tình dục kém cũng có thể góp phần gây ra các vấn đề về sức khỏe tâm thần. Bài viết này khám phá mối quan hệ giữa sức khỏe tâm thần và sự lành mạnh tình dục, nhấn mạnh tầm quan trọng của một cách tiếp cận toàn diện đối với sức khỏe và hạnh phúc.\n\n" +
        "Các tình trạng sức khỏe tâm thần như lo âu và trầm cảm có thể dẫn đến giảm ham muốn tình dục, rối loạn chức năng tình dục, và khó khăn trong việc duy trì các mối quan hệ lành mạnh. Ngược lại, các vấn đề về tình dục như đau khi quan hệ tình dục hoặc ham muốn tình dục thấp có thể dẫn đến cảm giác thất vọng, cô lập, hoặc trầm cảm. Do đó, việc giải quyết cả sức khỏe tâm thần và tình dục là rất quan trọng để đạt được sự khỏe mạnh toàn diện.\n\n" +
        "Tìm kiếm sự giúp đỡ chuyên môn khi cần thiết, thực hành giao tiếp cởi mở trong các mối quan hệ, và áp dụng các thói quen sống lành mạnh như tập thể dục thường xuyên và kỹ thuật quản lý căng thẳng là những bước quan trọng để cải thiện cả sức khỏe tâm thần và sự lành mạnh tình dục. Bằng cách hiểu mối liên hệ này, các cá nhân có thể sống một cuộc sống khỏe mạnh và viên mãn hơn.",
      date: "25/04/2025",
      image: "/blog/08.png",
    },
    {
      id: 9,
      title: "Giáo Dục Giới Tính Và Tầm Quan Trọng Của Nó",
      excerpt:
        "Tại sao giáo dục giới tính là một phần thiết yếu trong cuộc sống của mỗi người.",
      fullText:
        "Giáo dục giới tính đóng vai trò quan trọng trong việc giúp mọi người hiểu về cơ thể, các mối quan hệ, và những quyền lợi liên quan đến giới tính của họ. Nó cung cấp cho mọi người kiến thức về sự thay đổi của cơ thể, sức khỏe tình dục, và cách bảo vệ bản thân khỏi lạm dụng tình dục. Điều này đặc biệt quan trọng đối với thanh thiếu niên, khi họ bắt đầu trải nghiệm những thay đổi về thể chất và cảm xúc trong giai đoạn dậy thì.\n\n" +
        "Một trong những lợi ích chính của giáo dục giới tính là khả năng dạy về sự đồng ý trong tình dục, điều này rất cần thiết để xây dựng các mối quan hệ lành mạnh và tôn trọng. Nó giúp mọi người hiểu quyền lợi và trách nhiệm của mình, từ đó ngăn ngừa lạm dụng và thúc đẩy sự tôn trọng lẫn nhau trong các mối quan hệ. Thêm vào đó, nó còn dạy về các biện pháp an toàn trong quan hệ tình dục, bao gồm các phương pháp tránh thai và phòng ngừa các bệnh lây truyền qua đường tình dục (STIs), giảm thiểu các rủi ro liên quan đến quan hệ tình dục không an toàn.\n\n" +
        "Giáo dục giới tính cũng trao quyền cho mọi người để đưa ra những quyết định đúng đắn về sức khỏe tình dục của mình, giúp họ xây dựng lòng tự trọng và thiết lập ranh giới cá nhân. Nó thúc đẩy việc giao tiếp cởi mở về các mối quan hệ, giúp xóa bỏ các định kiến về tình dục và phát triển những thái độ tích cực. Trong một thế giới ngày càng phức tạp, việc trang bị cho thanh thiếu niên những kiến thức cần thiết sẽ giúp họ có thể đưa ra những quyết định có trách nhiệm và suy nghĩ thấu đáo về cuộc sống của mình.\n\n" +
        "Cuối cùng, giáo dục giới tính giúp mọi người hình thành những thói quen và mối quan hệ lành mạnh, thúc đẩy sự phát triển về thể chất, tinh thần, và xã hội. Nó là một công cụ thiết yếu cho sự phát triển của họ, dẫn đến một cuộc sống khỏe mạnh và có trách nhiệm hơn.",
      date: "01/07/2025",
      image: "/blog/09.png",
    },
    {
      id: 10,
      title: "Sức Khỏe Sinh Sản & Khám Phá",
      excerpt:
        "Lợi ích của việc chăm sóc sức khỏe sinh sản và khám sức khỏe định kỳ.",
      fullText:
        "Chăm sóc sức khỏe sinh sản là rất quan trọng đối với phụ nữ ở mọi lứa tuổi. Nó bao gồm nhiều phương pháp và thực hành khác nhau để đảm bảo sức khỏe và sự phát triển của hệ thống sinh sản nữ. Từ tuổi dậy thì đến thời kỳ mãn kinh, phụ nữ cần hiểu biết về khả năng sinh sản, các biện pháp tránh thai, và tầm quan trọng của việc khám phụ khoa định kỳ. Khi phụ nữ lớn tuổi, nhu cầu về sức khỏe sinh sản của họ cũng thay đổi, và việc cập nhật thông tin về những thay đổi này là chìa khóa để duy trì sức khỏe tốt.\n\n" +
        "Trong những năm sinh sản, việc theo dõi sức khỏe kinh nguyệt và tìm kiếm sự tư vấn chuyên môn nếu có bất kỳ bất thường nào xảy ra là rất quan trọng. Các biện pháp tránh thai như thuốc tránh thai, vòng tránh thai (IUD), que cấy, và bao cao su, giúp phụ nữ có khả năng kiểm soát sức khỏe sinh sản của mình. Việc khám sức khỏe định kỳ và sàng lọc, bao gồm xét nghiệm Pap và chụp X-quang vú, rất cần thiết để phát hiện sớm các vấn đề sức khỏe tiềm ẩn. Khi phụ nữ tiến gần đến thời kỳ mãn kinh, họ nên nhận thức được những thay đổi ảnh hưởng đến cơ thể và tìm kiếm lời khuyên về cách quản lý các triệu chứng và ngăn ngừa các rủi ro sức khỏe tiềm ẩn.\n\n" +
        "Bằng cách duy trì một lối sống lành mạnh, như dinh dưỡng hợp lý, tập thể dục thường xuyên, và quản lý căng thẳng, phụ nữ có thể cải thiện sức khỏe sinh sản và tổng thể của mình. Việc thăm khám định kỳ với các nhà cung cấp dịch vụ y tế đảm bảo rằng phụ nữ có quyền truy cập vào các nguồn lực và hỗ trợ cần thiết, dẫn đến kết quả sức khỏe tốt hơn trong suốt cuộc đời.",
      date: "05/07/2025",
      image: "/blog/10.png",
    },
  ];

  const handleOpenModal = (post) => {
    setModalPost(post);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalPost(null);
  };

  return (
    <div className="blog-page">
      <div className="blog-header">
        <h1
          style={{
            fontFamily:
              "Montserrat, Be Vietnam Pro, Segoe UI, Arial, sans-serif",
            textAlign: "center",
            lineHeight: 1.2,
            textTransform: "uppercase",
          }}
        >
          Chia sẻ Kiến Thức Về Chăm Sóc Sức Khỏe & Sinh Sản
        </h1>
        <p
          style={{
            fontFamily:
              "Be Vietnam Pro, Montserrat, Segoe UI, Arial, sans-serif",
            fontWeight: 500,
            fontSize: "1.22rem",
            color: "#222",
            textAlign: "center",
            margin: 0,
            letterSpacing: "0.04em",
            lineHeight: 1.7,
            maxWidth: 700,
            marginLeft: "auto",
            marginRight: "auto",
            paddingTop: 6,
          }}
        ></p>
      </div>

      <div className="blog-posts">
        {posts.map((post) => (
          <div className="blog-card" key={post.id}>
            <div className="blog-image">
              <img src={post.image} alt={post.title} />
            </div>
            <div className="blog-content">
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <span className="blog-date">{post.date}</span>
              <button
                className="view-full"
                onClick={() => handleOpenModal(post)}
              >
                Xem chi tiết
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && modalPost && (
        <Modal show={isModalOpen} onHide={handleCloseModal} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>{modalPost.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Cam kết của chúng tôi</h4>
            <p>{modalPost.fullText}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Đóng
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}
