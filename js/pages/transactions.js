Transactions = {

    CONSTANTS: {
        get_all_trans: '/user/transactions'
    },

    init: function () {
        Transactions.getMyTransactions();
    },

getMyTransactions: function () {
        $.ajax({
            url: Cedezone.CONSTANTS.BASE_URL + Transactions.CONSTANTS.get_all_trans,
            data: {
                format: 'json',
                token: Cedezone.getToken(),
            },
            error: function () {
                Cedezone.hideLoadingGif();
                // swal('Error', 'Error fetching Your recent activities', 'error')
                
                showDialog({
                    title: 'Oops..',
                    text: 'Error fetching Your Transaction History',
                })
            },
            dataType: 'json',
            success: function (data) {
                Cedezone.hideLoadingGif();
                Transactions.populateTable(data);
            },
            beforeSend: function () {
                Cedezone.showLoadingGif();
            },
            type: 'GET'
        });
    },
  populateTable: function (data) {
        if (data.status == true) {
            var $tr = '';
            var responses = data.data;
            if($.isEmptyObject(data.data)){
                $('.order-container').append($('#empty-activity').html())
                return false;
            }
            var $content =$('#order_history_template').html();

            //$('#myservices tbody').html(""); ///empty table for new records
            var no = (data.pagination.current_page - 1) * data.pagination.per_page;
            $('.order-container').empty();
            $('.order-container').append($content)
            $.each(responses, function (i, item) {
                //for(no =1; no<=5; no++){
                no++
                    $tr = $('<tr>').append(
                    $('<td>').text(no),
                    // $('<td>').text(item.order_ref_id),
                    $('<td>').text(item.amount),
                    $('<td>').text(item.narration),
                    $('<td>').text(item.order_details),
                    $('<td>').text(item.order_date),
                    );
                $('.order-container table tbody').append($tr);
                // $('.order-container table tbody').append('<div class="line" style="height: 40px; width: 6px; background: #888; margin: 0 auto;"></div>');

            });
            //console.log(data.pagination);
            // var paging = $.parseJSON(data.pagination);
            $('#pagination').html(data.pagination.link);
        } else {
            showDialog({
                    title: 'Oops..',
                    text: data.msg,
                })
        }
    },

}
