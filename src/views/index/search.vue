<<template>
    <div class="page-inner">

    </div>
</template>
<style lang="less">

</style>
<script>
import {Loading,Cell} from '../../components'
export default{
        components: {
            // 可以以key-value的形式注册组件, 此时挂载点的名字就是key
            // 否则挂载点和组件名字一致, 即vhead
            Loading,
            Cell,
        },
        data(){
            return{
                departCity:{},

            }
        },
    methods:{
        tackData:function(){
            this.$http.get('/static/book.json').then((response)=>{
                // success callback
                //    debugger

                var data = response.data
                //this.mainInfor = response.data
                this.navlist = this.mainInfor.MenuList

            },(response)=>{
                // error callback
            })
        }
    }
}
</script>
