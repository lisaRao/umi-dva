import {Component} from 'react';
import withRouter from 'umi/withRouter';
import  'utils/flexlib';


// let jwt = {"jwt":{"eventImage":{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXUyJ9.eyJhY2NvdW50SWQiOjEwMDAxNDMsImVtYWlsIjpudWxsLCJpYXQiOjE1Mjk0NjYyMTgsImV4cCI6MTUzMjA1ODIxOH0._fabB1FZlFL_zbeKky-gU3XmiKlTw45JkaLnktCgwZg"},"eventReaction":{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXUyJ9.eyJhY2NvdW50SWQiOjEwMDAxNDMsImlhdCI6MTUyOTQ2NjIxOCwiZXhwIjoxNTMyMDU4MjE4fQ.Clev0WLwLoNT2xzsHRRswJcNpgrnyv2V38iA-p0i-R0"},"coupon":{"token":"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXUyJ9.eyJhY2NvdW50X2lkIjoxMDAwMTQzLCJpYXQiOjE1Mjk0NjYyMTgsImV4cCI6MTUzMjA1ODIxOH0.wcXOMhvoa7UW1Ikeozy_NzXds309eH7sFDVGVh37JRb2rZrD6XZK8DwEM0B7n5Qzn7nHwwb_i_HEfRhI9ZBOZK_eefOr9T9P57rmcgVf_uTXkHaAQa4aNMyWKGR6DHET2HNvui5Ufmwj-_pfgM190gQ3SKrIDC7Bi0losWp4HOYhytZrJXuf0pOPltm46CLy0cJfF52Wp3bCdFEoAf9kq0OT7rsKEHHDk2IAMzN-T_c1vmYrzZMOgKz8kElcmxpaIk2jtglz-0mnh-3l6udsHSuE10HGPhOPgG8So7vkaidRY2KxkeKnJOC7GAfnzZXtEWDzYJtxhm3_dN_YkFVwvw"},"eShopping":{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXUyJ9.eyJoazAxIjp7ImFjY291bnRJZCI6MTAwMDE0M30sImlhdCI6MTUyOTQ2NjIxOCwiZXhwIjoxNTMyMDU4MjE4fQ.FeVTvYH2OZ4maX4KR2pYq1ujme816G6uwxWmNQW-vAg"},"ugc":{"token":"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXUyJ9.eyJhY2NvdW50X2lkIjoxMDAwMTQzLCJpYXQiOjE1Mjk0NjYyMTgsImV4cCI6MTUzMjA1ODIxOH0.qcuXPswoXqCwEQ9iR0-9Cr7TAocisT1Z_-fUMjzTtu50eFRYlnA87jRqM0l1HnybP-9FsLAYr4fUqB44qfD3-IVvmdBHPZ4ks9ofq721xpEAwPJr329HKjYwPSW58-befgEUJ1J_ntgXJMBThTawvNeCj28mkeQPMc4tFm5zNhk"},"currency":{"transactionNotiFeedToken":"bLL5Rk-LSEK5ZkyJxCXPMEaF6zk"},"socialReaction":{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXUyJ9.eyJicmFuZElkIjoiMSIsImFwcElkIjoiMSIsInVzZXJJZCI6MTAwMDE0MywiaWF0IjoxNTI5NDY2MjE4LCJleHAiOjE1MzIwNTgyMTh9.mg1ALm1Mk5EPCateKyTlD2qoVNX2-duE_DdpRcivsv0","appId":"1"},"ticketing":{"token":"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXUyJ9.eyJhY2NvdW50X2lkIjoxMDAwMTQzLCJpYXQiOjE1Mjk0NjYyMTgsImV4cCI6MTUzMjA1ODIxOH0.KxZEZGgfKYemueiq4B0LQl7JuQ_11knRFzRL5lusvt8IjIzJl3cX_b9wnTP1g7FMrsBpTeSEZecXgjn7qeyT3OVqB3lqd_k8flTnBen8dKQ9eJQjXHe3q9DBn_hcop_-alJGT69ZtHOA1FPcoT8xMG9spzj7H7C2J0LICsgMOSU"},"getStream":{"token":"YxkJV7h1zt0W8XZ-bxkJ-DV1VXU"},"eventCore":{"token":"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXUyJ9.eyJpYXQiOjE1Mjk0NjYyMTgsImV4cCI6MTUzMjA1ODIxOCwiYWNjb3VudElkIjoxMDAwMTQzfQ.rAGERmgvcc1eJNeo7PAv0zSJpFEG7lxOQ7yC7UHRgthfeATLwXbyunHXmtZ-z4Z-7K_A3IOEOGYgvlyXlTR0SuKJgLi6c_QkHuBfEk0USn58WeA-giQtIkYLfx9bW1C4oTCZ_Zmhk1ZQDv38S4e308_N05ozu4XfwJUEJ5QC_aR1deZs5_U58830KeWJqjV8xXrknW0duydGjQv7QnPXR8rWiAF_ggwY9DAE_J0dc6Bd3TqivmkXySVbP3WUbrFAGlMsA5SBlmNDh68J65-Vb6kTyi16aHSEDv24zvJP2ffWOX5tNR3czs4bZ0S56jyRwgnBit41yKsWfvRpX3AtEw"},"wallet":{"token":"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXUyJ9.eyJhY2NvdW50SWQiOjEwMDAxNDMsInJvbGVzIjpbIkNVU1RPTUVSIl0sIm1lcmNoYW50Ijp7Im5hbWUiOiIifSwiaWF0IjoxNTI5NDY2MjE4LCJleHAiOjE1MzIwNTgyMTh9.wN5J_XtzIJEW-oDAElqeF3NIHCERCShTAJlELRTcPJfAv_WP2W1wb5NC7yaB0_N2xxTBasLSuE8juXLiCAEgx6pXT-bo3CAKjSrT6WTa2K4tcTKk9PJcBQK5-cD3uxXxD984F8gBQ22W-ySE4J75DTS1DXf0uI0BIVtRSS1J81hjPIZsxMtJOzpTmnOr3oeDJXXAIw5OjiTnVH42nEp76VtMj9JmaL89XbA-aAHGoa47YmU0XUuKAJmBHrSokvgYDhKWHOJcfYZ5flDV3SvlLsp-AB-FTbAEdQYvnnD_r-DdrbDdnQ5NXm8yglvOv9AsH9v014WxOUl1NASc8jnm8aV0lUJmH3CejRePdTVQEvMGbofLdzH3N24m85D_QuD5M4T8f3bd-gmFxax1IGFYUk1cLR4SOZDlIzBvbM8qGjvfdtYUz3_ETZTeX1uiKYb2ZI2Jl3gKHZ7iule81jCRryN9AB4eSL8Su64t9Pm-HOnajuyLM5P0zrJH_W0pcu4tgkN0mk6-5r0XSt_UbIxGuguPaChds9ClcjptsRCRqGUs_YW9iHfyH5CDQkQvcz_IzHDUCTF3jK6eKH1J_VE-Cw1MeLOmcGq94oMnRP0X8GrH80r_pPHVQn72XmbmsCWPo1seO_QKc9Yy0Io-gCz63_XF4DZqwkskLQKoW45ErRQ","isMerchant":false,"merchantName":""},"ugcReaction":{"token":"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXUyJ9.eyJpYXQiOjE1Mjk0NjYyMTgsImV4cCI6MTUzMjA1ODIxOCwiYXBwSWQiOiJjOTBlNTcwOS1hZTIyLTQ4YWUtODU4Yi1iYjc0NTY0ZTVkZmEiLCJhY2NvdW50SWQiOjEwMDAxNDN9.9zO3KQz4euRmfqQIbSnJwcjJ3X_5He3n6xm_VqbnHFHh7ikFb1irjHOOrIjRQDun_SdeRvNner2LbR2YWgRaFzSpQyxmASJIXI7bIrtWw0GGQ8bpyDDKuliQp0C85gaZeeomZ80awjnZr9CQa4Ax7B1gl33RVPtfuYpA5AjPjGucRvpZJc4KewXNdNIY6TmU_mG4X67O1WAOmmxXvcY9Dcs1NtTHwoeCOxYsTeRuIa9lyZHclGY-mdEE7_D7-7nX12xpMJGUVbRt_dLrrRUfd5Hl07QPExk8J3BhPx4AJLM1cS7pcCR6LPM0RU7S9mO2jiZuh19e2VnJB7HSc6CotQ"},"survey":{"token":"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXUyJ9.eyJpYXQiOjE1Mjk0NjYyMTgsImV4cCI6MTUzMjA1ODIxOCwiYWNjb3VudElkIjoxMDAwMTQzfQ.TytuJkhwL3Oa1b7yHiOiFtWupAVaUEDhMX3Lf5l1Ind6BXCzVW3AKuUrxGYm0VXwD121bjL-H4Qu0T9PO0apXggujj5fXKmG7MPRDSF7dVHsEZMGumAx9OQJKmby780fayjTQzPjoF1U9X7pduhy6N0qX6qmqqifv7SWNYqyCKTH61QacdbGHf4OtMjBC4yWO9WwshUi_2dJiDVtJdW1UjIhrqCm5kSNKHAR7tweAW1e5d63EAq03Fqw6sJN-LXQ83s5ZDLRk1d1LnJ2sfO0E1aBTRpf1czWAYhYc1E9WX5FDplF7k1SX7z60hbX4Toz9cYMQDF-Hm95w0Q3t6Q1Tw"},"eatojoy":{"token":"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXUyJ9.eyJpYXQiOjE1MzUzNjk2OTAsImV4cCI6MTUzNzk2MTY5MCwiYWNjb3VudElkIjoxMDAwNTM5fQ.iJlC9niB5f4G_oe6sWYzIXPsuFlRO4Wj1cO5uVOUnMMPNqu_fTZOuFkc_lMMBl-D45GPURJkF-plCMvtD_a-6XYNlgsXICrDGOtirpH9MzOG1ITD02B9VsL9Nbpm6wldOe09J8WDcJl-6OUXpED0dM2gOm9YJFaiDaNKrPKP8kTn1KmaTWUS359_UDv24Av927_69U6O_altnnsRcBFX1wgUDNTuyK93ZC1y7K5eWnx7ym-1DoY_wV4QiGcX9gW1IowUxfYD6aFBHBxAUG5oCFXBZhX1EiScbDmeIg0nmX_BTqzHrcMA_PRXFl3XBi1KRox6a-EgMIJRKkRm-wWU7A"},"eventEnrollment":{"token":"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXUyJ9.eyJpYXQiOjE1Mjk0NjYyMTgsImV4cCI6MTUzMjA1ODIxOCwiYWNjb3VudElkIjoxMDAwMTQzfQ.aHxjqSoKb1WIGB7BUgf38ibBUZwj-GhZupp9LhQ8wzc4T6kSvnnPjdBiNb6pvCdjjW-s0c1dU5FSd8pm1WcTXBqJZRNcLETgZkdlEV8dvHsn6UiKj2AI_DI77XwdmAIPvbUaXe0ApTva4skFleFMIaSFJHpqJ77aBvcIbci9muV-DsmSWiCvtYGvjS9jjziJo-H2GwS4NNQKgYSubar3v80cLJjbbeyISRLcz_RzZTlgSaZff2mHe9eDSQpa_Flfk2PyzM4_TVCi79SNhiMbAZ_itQqEEiREhSSRjs-IJh0sKhU86bHHI1HJW75JGXaPeJTYerYOA0sx40F68jJg6w"},"comment":{"token":"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXUyJ9.eyJoazAxX3VzZXJpZCI6ImhrMDFfMTAwMDE0MyIsImhrMDFfZGF0YSI6eyJoazAxX3VzZXJuYW1lIjoiMTg3N2dvaDkiLCJoazAxX25pY2tuYW1lIjoiXHU3NTI4XHU2MjM2XzIzODM1NzEiLCJoazAxX2xvZ2luX2lwIjoiIiwiYXZhdGFyIjp7ImhrMDFfdXNlcl9hdmF0YXJfc21hbGwiOiIifX0sImV4cCI6MTUzMjA1ODIxOCwiaWF0IjoxNTI5NDY2MjE4fQ.fb7FIVgUrzKZNzQX0krwcknJjBWUIygCTy_BDLcNsyLgnHzk8MrH7O9M1xLAOBY_MuWXfg-oeg_XQt-ONeAjfiG7d1KMHj-UaVPq7pX0IZSruIjWbbw7hcf_v8dYfqBR4Sht7n6ULFNAcPb3_iRWjpLQr0tyZ-XKih8qJtlBr60"}},"accessToken":"ndrkXrCMUJgH8lDNUiVqsOst87FOfSw8jAn7B2t1ywrn9M2LB4TzcxMzfcHH"}
// localStorage.setItem("userCert", JSON.stringify(jwt));
// let memberInfo = { "user_id": 10035, "account_id": 1000142, "user_name": "用戶_8855222", "mobile": "13611405927", "country_code": "86", "gender": 0, "avatar": "", "orders": 0, "order_time": 0, "is_new": true, "updated_at": 1530168736, time: 1531290305 };
// localStorage.setItem("memberInfo", JSON.stringify(memberInfo));


class Layout extends Component {
  componentDidUpdate = (prevProps) => {
    if(this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);    
    }
  }
  render() {
    return this.props.children;
  }
}

export default withRouter(Layout);

