/**
 * MixHotel Admin Room Gallery Manager
 * Xử lý thêm, xóa, sắp xếp ảnh gallery phòng và đồng bộ tự động với Database & Gutenberg.
 */
(function($) {
    'use strict';

    var mediaFrame = null;
    var ajaxXhr = null;

    /**
     * Thu thập danh sách ID ảnh hiện tại trong gallery và đồng bộ mọi kênh:
     * 1. Hidden inputs trong tất cả các form (hỗ trợ meta-box-loader của Gutenberg)
     * 2. Redux store của Gutenberg (để nút Cập nhật nhận diện được thay đổi)
     * 3. AJAX tức thì (lưu ngay vào database để F5 không bị mất dữ liệu)
     */
    function updateGalleryData() {
        var $preview = $('#mixhotel-gallery-preview');
        if (!$preview.length) {
            return [];
        }

        // 1. Thu thập ID trực tiếp từ các thumbnail đang có trong DOM
        var ids = [];
        $preview.find('.mixhotel-gallery-thumb').each(function() {
            var id = $(this).attr('data-id');
            if (id && String(id).trim() !== '') {
                ids.push(String(id).trim());
            }
        });

        var idString = ids.join(',');

        // 2. Cập nhật TẤT CẢ hidden input có name="mixhotel_room_gallery"
        var $inputs = $('input[name="mixhotel_room_gallery"]');
        $inputs.each(function() {
            $(this).val(idString);
            $(this).attr('value', idString);

            // Bắn cả jQuery event lẫn Native DOM event để Gutenberg #poststuff bắt được
            $(this).trigger('change').trigger('input');
            try {
                this.dispatchEvent(new Event('input', { bubbles: true }));
                this.dispatchEvent(new Event('change', { bubbles: true }));
            } catch (e) {}
        });

        // 3. Đồng bộ Redux Store của Gutenberg (đánh dấu post dirty để kích hoạt nút Cập nhật)
        if (window.wp && wp.data && typeof wp.data.dispatch === 'function') {
            try {
                if (wp.data.dispatch('core/editor') && typeof wp.data.dispatch('core/editor').editPost === 'function') {
                    var numericIds = ids.map(function(n) { return parseInt(n, 10); }).filter(function(n) { return !isNaN(n) && n > 0; });
                    wp.data.dispatch('core/editor').editPost({
                        meta: { _mixhotel_room_gallery: numericIds }
                    });
                }
            } catch (err) {
                console.warn('[MixHotel Gallery] Gutenberg dispatch warn:', err);
            }
        }

        // 4. Lưu tức thì qua AJAX vào CSDL
        saveGalleryViaAjax(ids);

        return ids;
    }

    /**
     * Lưu danh sách ID ảnh vào CSDL thông qua WordPress AJAX
     *
     * @param {Array} ids Mảng các attachment IDs.
     */
    function saveGalleryViaAjax(ids) {
        var config = window.mixhotelGalleryConfig || {};
        if (!config.ajaxUrl || !config.postId || !config.nonce) {
            console.warn('[MixHotel Gallery] Thiếu cấu hình AJAX config.');
            return;
        }

        var $status = $('#mixhotel-gallery-status');
        $status.stop(true, true).css({
            'color': '#2271b1',
            'display': 'inline-block'
        }).text(config.savingText || 'Đang lưu...');

        // Hủy request trước nếu đang chạy dở để tránh race condition
        if (ajaxXhr && ajaxXhr.readyState !== 4) {
            ajaxXhr.abort();
        }

        ajaxXhr = $.ajax({
            url: config.ajaxUrl,
            type: 'POST',
            dataType: 'json',
            data: {
                action: 'mixhotel_save_room_gallery',
                post_id: config.postId,
                gallery_ids: ids.join(','),
                nonce: config.nonce
            },
            success: function(res) {
                if (res && res.success) {
                    $status.css('color', '#46b450').text(config.savedText || '✓ Đã lưu thay đổi gallery');
                    setTimeout(function() {
                        $status.fadeOut(500);
                    }, 2500);
                } else {
                    var msg = (res && res.data && res.data.message) ? res.data.message : 'Lỗi khi lưu gallery';
                    $status.css('color', '#dc3232').text('⚠ ' + msg);
                }
            },
            error: function(xhr, status) {
                if (status !== 'abort') {
                    $status.css('color', '#dc3232').text('⚠ Lỗi kết nối máy chủ');
                }
            }
        });
    }

    // =========================================================================
    // EVENT LISTENERS (DELEGATED ĐỂ CHỐNG LỖI REACT UNMOUNT/REMOUNT)
    // =========================================================================

    // 1. Xóa ảnh khỏi gallery (Xóa ngay lập tức khỏi DOM, không delay fadeOut)
    $(document).on('click', '.mixhotel-remove-img', function(e) {
        e.preventDefault();
        e.stopPropagation();

        var $thumb = $(this).closest('.mixhotel-gallery-thumb');
        $thumb.remove();
        updateGalleryData();
    });

    // 2. Mở Media Library để thêm ảnh
    $(document).on('click', '#mixhotel-add-gallery-btn', function(e) {
        e.preventDefault();

        var config = window.mixhotelGalleryConfig || {};

        if (mediaFrame) {
            mediaFrame.open();
            return;
        }

        if (typeof wp === 'undefined' || !wp.media) {
            alert('WordPress Media Library chưa được khởi tạo. Vui lòng tải lại trang.');
            return;
        }

        mediaFrame = wp.media({
            title: config.mediaTitle || 'Chọn ảnh Gallery Phòng',
            button: { text: config.mediaButton || 'Thêm vào Gallery' },
            multiple: true
        });

        mediaFrame.on('select', function() {
            var attachments = mediaFrame.state().get('selection').toJSON();
            var $preview = $('#mixhotel-gallery-preview');

            // Danh sách ID hiện có để tránh trùng
            var existingMap = {};
            $preview.find('.mixhotel-gallery-thumb').each(function() {
                var id = $(this).attr('data-id');
                if (id) existingMap[String(id)] = true;
            });

            attachments.forEach(function(att) {
                var attIdStr = String(att.id);
                if (!existingMap[attIdStr]) {
                    existingMap[attIdStr] = true;
                    var thumbUrl = (att.sizes && att.sizes.thumbnail) ? att.sizes.thumbnail.url : att.url;
                    var thumbHtml =
                        '<div class="mixhotel-gallery-thumb" data-id="' + att.id + '" ' +
                        'style="position:relative;width:100px;height:100px;cursor:grab;border:1px solid #ddd;border-radius:4px;overflow:visible;">' +
                            '<img src="' + thumbUrl + '" style="width:100%;height:100%;object-fit:cover;border-radius:4px;display:block;">' +
                            '<button type="button" class="mixhotel-remove-img" ' +
                            'style="position:absolute;top:-8px;right:-8px;background:#d63638;color:#fff;border:2px solid #fff;border-radius:50%;width:24px;height:24px;cursor:pointer;font-size:14px;font-weight:bold;line-height:1;display:flex;align-items:center;justify-content:center;z-index:99;box-shadow:0 2px 4px rgba(0,0,0,0.3);padding:0;" ' +
                            'title="Xóa ảnh">&times;</button>' +
                        '</div>';
                    $preview.append(thumbHtml);
                }
            });

            updateGalleryData();
        });

        mediaFrame.open();
    });

    // 3. Khởi tạo Drag-and-drop sắp xếp ảnh nếu có jQuery UI sortable
    function initSortable() {
        var $preview = $('#mixhotel-gallery-preview');
        if ($preview.length && $.fn.sortable) {
            $preview.sortable({
                items: '.mixhotel-gallery-thumb',
                cursor: 'grabbing',
                stop: function() {
                    updateGalleryData();
                }
            });
        }
    }

    $(document).ready(function() {
        initSortable();
    });

    // Xuất public API để kiểm tra / gọi programmatically
    window.mixhotelGallery = {
        update: updateGalleryData,
        getIds: function() {
            var ids = [];
            $('#mixhotel-gallery-preview .mixhotel-gallery-thumb').each(function() {
                var id = $(this).attr('data-id');
                if (id) ids.push(String(id).trim());
            });
            return ids;
        },
        removeById: function(id) {
            $('.mixhotel-gallery-thumb[data-id="' + id + '"]').remove();
            return updateGalleryData();
        }
    };

})(jQuery);
