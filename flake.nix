{
  description = "RE:Desktop Shell for Hyprland";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";

    ags = {
      url = "github:aylur/ags";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs =
    { self
    , nixpkgs
    , ags
    ,
    }:
    let
      system = "x86_64-linux";
      pkgs = nixpkgs.legacyPackages.${system};
    in
    {
      packages.${system} = {
        default = ags.lib.bundle {
          inherit pkgs;
          src = ./.;
          name = "re-shell";
          entry = "app.ts";

          # additional libraries and executables to add to gjs' runtime
          extraPackages = with pkgs; [
            fzf
            wrapGAppsHook
            gobject-introspection
          ] ++ (with ags.packages.${system}; [
            io
            astal3
            apps
            battery
            hyprland
            mpris
            network
            notifd
            powerprofiles
            tray
            wireplumber
          ]);
        };
      };

      devShells.${system} = {
        default = pkgs.mkShell {
          buildInputs =
            with pkgs; [
              nixpkgs-fmt
              zsh
            ] ++ (with ags.packages.${system}; [
              io
              astal3
              apps
              battery
              hyprland
              mpris
              network
              notifd
              powerprofiles
              tray
              wireplumber
            ]);
          shellHook = ''
            export SHELL=${pkgs.zsh}/bin/zsh
            exec ${pkgs.zsh}/bin/zsh
          '';
        };
      };
    };
}
