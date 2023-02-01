<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bar Charts</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.bundle.min.js" integrity="sha512-vBmx0N/uQOXznm/Nbkp7h0P1RfLSj0HQrFSzV8m7rOGyj30fYAOKHYvCNez+yM8IrfnW0TCodDEjRqf6fodf/Q==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>   
    <script src="https://code.jquery.com/jquery-3.6.1.min.js" integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossorigin="anonymous"></script>
</head>
<body>
    <div style="heigh:400px;width:900px;margin:auto;">
        <canvas id="barChart"></canvas>
    </div>

    <script>
        $(function(){
            var datas = <?php echo json_encode($datas); ?>;
            var barCanvas = $("#barChart");
            var barChart = new Chart(barCanvas,{
                type:'bar',
                data:{
                    labels:['1','2','3','4','5','6','7','8','9','10','11','12'],
                    datasets:[
                        {
                            label:'customer',
                            data:datas,
                        }
                    ]
                },
                options:{
                    scales:{
                        yAxes:[{
                            ticks:{
                                beginAtZero:true
                            }
                        }]
                    }
                }
            })
        })
    </script>
</body>
</html>