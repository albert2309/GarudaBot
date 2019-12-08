@extends('layout.foundation')

@section('title', 'Best Automatic Trading')

@section('content')
    <div class="section__content section__content--p30">

        <TradeFooter class="status">
            <div class="container-fluid p-0 ">
            <div class="row">
                <div class="col-4 balance pr-0">
                    <small>Balance</small>
                    <p style="font-size: 18px;line-height: 18px;">25892.76</p>
                </div>
                <div class="col-4 sessionBalance pr-0">
                    <small>Session Profit</small>
                    <p style="font-size: 18px;line-height: 18px;">0</p>
                </div>
                <div class="col-4 totalProfit pr-0">
                    <small>Profit</small>
                    <p style="font-size: 18px;line-height: 18px;">0</p>
                </div>
            </div>
            </div>
        </TradeFooter>
        <TradeFooter>
            <button class="btn btn-primary decide-trade" id="green-trade">RISE EQUAL</button>
            <button class="btn btn-danger decide-trade" id="red-trade">FALL EQUAL</button>
        </TradeFooter>
        <div class="container-fluid" id="status">
            <div class="row">
                <div class="col-lg-5">
                    <div class="au-card m-b-10 tick-mobile">
                        <div class="au-card-inner tick-mobile">
                            <h3 class="title-2 m-b-15">Tick History</h3>
                            <div class="row">
                                <div class="col-md-9" >
                                    <canvas id="tick-chart" style="max-height: 200px;"></canvas>
                                </div>
                                <div class="col-md-3 tick-mobile">
                                    <p>Last 10 ticks</p>
                                    <ul id="tickHistory">
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="au-card m-b-10" id="trade-selection">
                        <div class="card-body">
                            <div class="default-tab">
                                <nav>
                                    <div class="nav nav-tabs" id="nav-tab" role="tablist">
                                        <a class="nav-item nav-link active" id="nav-home-tab" data-toggle="tab"
                                           href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Manual</a>
                                        <a class="nav-item nav-link" id="nav-profile-tab" data-toggle="tab"
                                           href="#nav-profile" role="tab" aria-controls="nav-profile"
                                           aria-selected="false">Automatic</a>
                                    </div>
                                </nav>
                                <div class="tab-content pt-2" id="nav-tabContent">
                                    <div class="tab-pane fade show active" id="nav-home" role="tabpanel"
                                         aria-labelledby="nav-home-tab">
{{--                                        <div class="row form-inline">--}}
{{--                                            <label for="select" class=" form-control-label"--}}
{{--                                                   style="display: inherit; ">Market</label>--}}
{{--                                            <label class="form-control-modified">--}}
{{--                                                <input id="market" style="width: 120px">--}}
{{--                                                <button class="dropdown-btn" id="market-drop" type="button">--}}
{{--                                                    <i class="fas fa-caret-down"></i>--}}
{{--                                                </button>--}}
{{--                                            </label>--}}
{{--                                        </div>--}}
{{--                                        <div class="row form-inline">--}}
{{--                                            <label for="select" class=" form-control-label">Select</label>--}}
{{--                                            <select name="select" id="contract" class="form-control-modified">--}}
{{--                                                <option name="Contract" value="Contract"></option>--}}
{{--                                            </select>--}}
{{--                                        </div>--}}
                                        <form class="form-inline">
                                            <div class="input-group">
                                                <label for="select" class="form-control-label manual-input">Market</label>
                                                <label class="form-control-modified">
                                                    <input id="market" style="width: 120px">
                                                    <button class="dropdown-btn" id="market-drop" type="button">
                                                        <i class="fas fa-caret-down"></i>
                                                    </button>
                                                </label>
                                            </div>

                                            <div class="input-group">
                                                <label for="select" class="form-control-label manual-input">Trade Type</label>
                                                <select name="select" id="contract" class="form-control-modified" style="max-width:150px">
                                                    <option name="Contract" value="Contract"></option>
                                                </select>
                                            </div>
                                        </form>

                                    </div>
                                    <div class="tab-pane fade" id="nav-profile" role="tabpanel"
                                         aria-labelledby="nav-profile-tab">
                                        <div class="tab-pane fade show active" id="nav-home" role="tabpanel"
                                             aria-labelledby="nav-home-tab">
                                            <div class="form-group">
                                                <small>Market</small>
                                                <label>
                                                    <input id="market"/>
                                                    <button class="dropdown-btn" id="market-drop" type="button">
                                                        <i class="fas fa-caret-down"></i>
                                                    </button>
                                                </label>
                                            </div>
                                            <div class="form-group">
                                                <small>Contact</small>
                                                <label>
                                                    <input id="contract"/>
                                                    <button class="dropdown-btn" id="contract-drop" type="button">
                                                        <i class="fas fa-caret-down"></i>
                                                    </button>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="wrap au-card">
                <iframe class="frame" src="https://tradingview.binary.com/v1.3.12/main.html"></iframe>
            </div>
        </div>
    </div>

    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
         aria-hidden="true" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title modal-center">Garuda Bot</h4>
                    <p>Start your auto-trading journey with us</p>
                </div>
                <div class="modal-body">
                    <span class="fa-stack fa-1x">
  <i class="fa fa-circle fa-stack-2x"></i>
  <strong class="fa-stack-1x text-primary">1</strong>
</span><span>If you do not have a binary.com account,</span>
                    <div class="placeholder-center modal-center">
                        <button class="btn btn-primary modal-center button-center"
                                onclick="window.open('https://www.binary.me/en/home.html', '_blank')">
                            Register now
                        </button>
                    </div>
                    <div>
    <span class="fa-stack">
    <span class="fa fa-circle fa-stack-2x"></span>
    <strong class="fa-stack-1x text-primary">2</strong>
</span><span>Create a token via:</span>
                        <div class="placeholder-center modal-center">
                            <button class="btn btn-primary modal-center"
                                    onclick="window.open('https://www.binary.me/en/user/security/api_tokenws.html', '_blank')">
                                Binary.com
                            </button>
                            <button class="btn btn-primary modal-center"
                                    onclick="window.open('https://www.binary.me/en/user/security/api_tokenws.html', '_blank')">
                                Binary.me
                            </button>
                        </div>
                    </div>
                    <div>
    <span class="fa-stack">
    <span class="fa fa-circle fa-stack-2x"></span>
    <strong class="fa-stack-1x text-primary">3</strong>
</span><span>Insert a token:</span>
                        <input type="text" class="form-control" id="apiTokenField"
                               placeholder="API Token">
                    </div>
                    <div id="auth-error"></div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary button-center" id="authButton">Authorize</button>
                </div>
            </div>
        </div>
    </div>
    {{--    <div class="modal hide fade" id="myModal" style="opacity: 1; color: black">--}}
    {{--        <div class="modal-header">--}}
    {{--            <h3>Insert API Token</h3>--}}
    {{--        </div>--}}
    {{--        <div class="modal-body">--}}
    {{--            --}}
    {{--        </div>--}}
    {{--    <div class="modal-footer">--}}
    {{--        <a href="#" class="btn btn-primary">Authorize</a>--}}
    {{--    </div>--}}
    {{--    </div>--}}
@endsection